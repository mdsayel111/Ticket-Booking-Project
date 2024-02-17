"use client";
import React from "react";
import Container from "../Container/Container";
import CategoryHeader from "../CategoryHeader/CategoryHeader";
import ItemCard from "../ItemCard/ItemCard";
import {
  categoryTitleAndLinkArr,
  event_And_Sports,
  movie,
} from "@/ClientFiles/Types/CommonTypes";
import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";

const AllCategoryItems = ({
  items,
  categories,
  callFromHost,
}: {
  items: Record<string, (movie | event_And_Sports)[]>;
  categories: categoryTitleAndLinkArr[];
  callFromHost?: boolean;
}) => {
  const itemName = Object.keys(items);
  const { userInfo } = useAppSelector((state) => state.user);
  return (
    <Container>
      {categories.map((category, index) => (
        <div key={index}>
          <CategoryHeader
            values={{ title: category.title, link: category.path }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 my-10">
            {items[itemName[index]].map((item, index) => (
              <ItemCard
                callFromHost={callFromHost}
                key={index}
                values={{
                  item: JSON.parse(JSON.stringify(item)),
                  path: `/category/${item.category}s/${item._id}`,
                }}
                updatePath={`/host/update_item/${category.title}/${item._id}?email=${userInfo.email}`}
              />
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
};

export default AllCategoryItems;
