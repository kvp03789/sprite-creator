//hair
import HairBun from './img/spritesheets/hair/hair_bun.png'
import HairMohawk from './img/spritesheets/hair/hair_mohawk.png'
import HairLong from './img/spritesheets/hair/hair_long.png'
//face
import Eyes1 from './img/spritesheets/face/eyes_1.png'
import Eyes2 from './img/spritesheets/face/eyes_2.png'
import Mouth1 from './img/spritesheets/face/mouth_1.png'
//head
import Head1 from './img/spritesheets/head/head_1.png'
//torso
import Torso1 from './img/spritesheets/torso/torso_1.png'
//legs
import Legs1 from './img/spritesheets/legs/legs_1.png'


const assetManifest = {
    "bundles":[
        {
            "name": "hair",
            "assets": [
                {
                "alias": "HairBun",
                "src": HairBun
                },
                {
                "alias": "HairMohawk",
                "src": HairMohawk
                },
                {
                "alias": "HairLong",
                "src": HairLong
                },
            ]
        },
        {
            "name": "eyes",
            "assets": [
                {
                "alias": "Eyes1",
                "src": Eyes1
                },
                {
                "alias": "Eyes2",
                "src": Eyes2
                },
            ]
        },
        {
            "name": "mouth",
            "assets": [
                {
                    "alias": "Mouth1",
                    src: Mouth1
                }
            ]
        },
        {
            "name": "head",
            "assets": [
                {
                "alias": "Head1",
                "src": Head1
                },
            ]
        },
        {
            "name": "torso",
            "assets": [
                {
                "alias": "Torso1",
                "src": Torso1
                },
            ]
        },
        {
            "name": "legs",
            "assets": [
                {
                "alias": "Legs1",
                "src": Legs1
                },
            ]
        },
    ]
}

export default assetManifest