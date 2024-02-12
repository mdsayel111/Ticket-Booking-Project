import axios from "axios";

export const uploadImage = async (files: any) => {

    // upload multiple files
    if (files instanceof Array) {
        const imgUrls: any = []
        for (let file of files) {
            const formData = new FormData()
            formData.append("image", file)
            const imgbbResult = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                formData
            );
            const photoUrl = imgbbResult.data.data.display_url;
            imgUrls.push(photoUrl)
        }
        return imgUrls
    }

    // upload single file
    const formData = new FormData()
    formData.append("image", files)
    const imgbbResult = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
    );
    const photoUrl = imgbbResult.data.data.display_url;
    return photoUrl;
};