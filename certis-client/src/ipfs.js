import fs from 'fs'
import { NFTStorage, File } from 'nft.storage'


const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA3MDA5NDhFYjVkZGJlZjNiZjgxNkYwMDllYjg2OGEyOTg2ODEzYzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzMTU0MjU2NDE2OCwibmFtZSI6Ik5GVFN0b3JhZ2UifQ.qG1W9HtK3QlKDhpp9wPu6Q_d0h4XQ3tC-M6piZTmDM4";


async function ipfs(fname,file,day,des){
  
    const client = new NFTStorage({ token: apiKey  })
    const metadata = await client.store({
    name: fname,
    date: day,
    description: des, 
    imagename:file,
    image: new File([await fs.promises.readFile('../public/NFT/'+file)], file, {
      type: 'image/jpg',
    }),
    other: "Other"
    })
    console.log(metadata.url)
    return metadata.url;
}
//
export { ipfs} 