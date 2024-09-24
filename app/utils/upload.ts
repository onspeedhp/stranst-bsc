/* eslint-disable @typescript-eslint/no-explicit-any */
export async function uploadJson(content: any) {
  try {
    const data = JSON.stringify({
      pinataContent: content,
      pinataOptions: {
        cidVersion: 1,
      },
    });

    const uploadRes = await fetch(
      '<https://api.pinata.cloud/pinning/pinJSONToIPFS>',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: data,
      }
    );

    console.log(uploadRes);

    const uploadResJson = await uploadRes.json();
    const cid = uploadResJson.IpfsHash;
    console.log(cid);
    return cid;
  } catch (error) {
    console.log('Error uploading file:', error);
  }
}
