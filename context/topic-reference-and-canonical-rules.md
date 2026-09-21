<!-- geo-agent-context -->
> **Source:** `context.md` of a private topic-merge working project  
> **Captured:** 2026-09-16 · **Read as:** durable reference — the 8 topic-reference rules + canonical space/topic ID tables  

---

# Topic reference rules and canonical IDs

## Topic reference rules

### Current rules:

1. Featured topic tag — any candidate with Tags → Featured topic wins outright.
2. Topic with Curated topic tag
3. Topic with most backlinks
4. Most props + relations

### New proposed rules

These rules are meant to determine which topic should be referenced or kept when merging two entities.

Right now, when two duplicate topics exist, the publishing script randomly references one of them. Instead, it should deterministically select the best topic.

⚠️ Topics with a score should be treated as canonical topics.

⚠️ When resolving duplicates, if one topic has a score and the other does not, always keep or reference the scored topic.

⚠️ If both topics have a score, do not merge them. Escalate to Armando for review.

**Use the following priority order to decide which duplicate topic should be referenced or kept:**

1. Canonical space: **Always reference the topic that is also a canonical space. If one duplicate topic is also a canonical space and the other does not, the canonical-space must always be selected.**
    
    Example: **You must reference Crypto** (space id: c9f267dcb0d270718c2a3c45a64afd32 - entity id: 0fcd62b5798f4078b84fa535ac95fcf3) **not Crypto** (entity id: c6d666eb7ffa40d29db1f713eb1943f3)
    
2. Canonical topic: **Any topic that is in Root (Geo) space is a canonical topic.** If one duplicate topic is in Root (Geo) and the other is not, the Root (Geo) topic should be selected.
3. Featured topic: A topic with the **Featured topic** tag. These are the topics displayed as **Featured Timelines** in the News App. If one duplicate topic has the Featured topic tag and the other does not, the featured topic should be selected.
4. Curated topic: A topic with the **Curated Topic** tag. These 1,850 topics from podcast space are part of a structured hierarchy. The hierarchy contains broader topics (most of them) and subtopics aka keywords. https://docs.google.com/spreadsheets/d/12TGXWJLphiBroDxlB5VLjh_fn_VRv78VaicyvvaR3yk/edit?gid=199607668#gid=199607668
5. Topic with more backlinks: Reference or keep the topic that has more backlinks. If one duplicate topic has significantly more backlinks, it is more established and should be kept as the referenced topic.
6. Topics with more filled properties + more relations: T**he topic with more structured data.** If neither topic wins based on the rules above, compare how much data each topic has. Prefer the topic with more filled properties and more relations, since it is likely more complete and useful.
7. Never reference a topic from a personal space: If one of the duplicate topics belongs to a personal space, it should not be selected as the referenced topic, even if it has more backlinks, properties, or relations.
8. Never reference a topic from a dataset space: If one of the duplicate topics belongs to a dataset space, it should not be selected as the referenced topic, even if it otherwise ranks higher by backlinks, properties, relations, or age.

### Open questions

1. What should we do with scores?
    1.  Should canonical spaces, canonical topics, and featured topics keep priority no matter what? 
    2. Should choosing the topic that has a score over the one that does not have a score be rule #4? 
    3. What should we do when both topics have a score? Should we keep both?
2. What should we do with topic age? Should the topic created first be selected over the one created more recently? 
    1. Where should this rule sit in the priority order?

## Spaces & topics IDs

### **Canonical spaces:**

| Space | Space ID |
| --- | --- |
| **Crypto** | `c9f267dcb0d270718c2a3c45a64afd32` |
| **AI** | `41e851610e13a19441c4d980f2f2ce6b` |
| **Health** | `52c7ae149838b6d47ce0f3b2a5974546` |
| **Pharma** | `19f11bc6f1a62ac434936af814d1f8b5` |
| **Technology** | `870e3b3068661e6280fad2ab456829bc` |
| **World affairs** | `89bd89bf28ff8a0963faf92a8c905e20` |
| **U.S. Politics** | `4582fbbee28a16589154f7e36f1ee3c5`  |
| **Industries** | `d69608290513c2a91102c939b3265bd7` |
| **Education** | `ec349623f33236aee13c12dcd629ee81` |
| **Software** | `9b611b848b12491b9b6b43f3cf019b8b` |
| **Places** | `84a679ce188f061ac9a92380bac2bab5` |
| **Documentation** | `784bfddae3f3976118c561bf28195b44`  |
| **Podcasts** | `b5a31f8182b042437ede0f84ee02f104` |

### **Canonical topics = topics in Root space**

| Topic | Entity ID |
| --- | --- |
| AGI | `59368a8ed5154047a4a41f398a611c13` |
| AI | `8cb0a2b4adbf4627aa080cec5112099a` |
| AI agents | `b684a7a520ab4df88147f9351c379a43` |
| AI coding | `effbedf34a72405d826fa60816992887` |
| AI image | `5a53b2a3ff444986b556818c45f6eafc` |
| AI music generation | `72532a1b59fe4230946eb01e966361aa` |
| AI research & benchmarks | `ead31742c6e74c0c917aea18291d12b0` |
| AI video generation | `3025b63f796c4fc9835cf946dc6052c0` |
| Academia | `6881659ac4eb43739b1add0bc07ab8ff` |
| American football | `9ae4b1a78e3a41758087e75325ed2d0f` |
| Apps & software | `cd63784e899d46d0abf2252c5161705d` |
| Arts | `9d5bf730cad8443fb941b3067e560689` |
| Arts & culture | `145b1d7261d04a668e825b7b97cfd072` |
| Baseball | `7bb902f704fc435297da9c437330f0f2` |
| Basketball | `9274c73323bb47808ef21b6e001b143e` |
| Biohacking | `73fb776234f14ecca9a6fba526475ff3` |
| Bitcoin | `2f8238b2f4c899fb23b4a2f8aabd996c` |
| Books | `9f50bdf6baaa46769c148db35af8c2ae` |
| Boxing | `324526bb9bed42ab961d66e971809612` |
| Business & finance | `459c7abee3f04ab3995017a16781ebf9` |
| Cognitive performance | `819d65667cab43c29a7de2cdf5823da1` |
| Cold exposure therapy | `e8632609aa964e1ea70752d39d19e7d0` |
| College football | `239710c2907347aea586698503c4c8e7` |
| Conservative politics | `8e257326f09649db876cf2bd7e52e1e0` |
| Consumer gadgets | `3e9b6e94c85243998b7d5812b6e4383a` |
| Consumer products | `ac91fd1123b845eb98c6ab06f7040612` |
| Creative AI | `9cbaceb0afbb473a9d152c70f8657036` |
| Crypto ⚠️ | `0fcd62b5798f4078b84fa535ac95fcf3` |
| Crypto | `c6d666eb7ffa40d29db1f713eb1943f3` |
| Crypto & Politics | `0b1a0fa435f305e9b8885b127b991faf` |
| Crypto events | `44bd4d52cf5e44d4845730e1faa7c009` |
| Crypto markets | `9cdb5c35868a46a69b2138de79497ad2` |
| Culture wars | `8cba943129d04bfc991ce8f98e36df86` |
| Cybersecurity | `8822a60458aa48bfada81b28c10b3a59` |
| Data privacy | `0db26b5bd3294c52b4c54b8265e2de49` |
| DeFi | `46ac9d4f638e4dc996aa5dfa79be4394` |
| Deep research | `bfecfe45c2bc4e5ebafb53a70d219713` |
| Demographics & socioeconomics | `b9b5920a52fb4e9790bcd4cdc87f181c` |
| Elections | `1edb888775e44af08738cb33d445ba10` |
| Endurance running | `5093c294e0a74c51a64db22b5fe0900c` |
| Entertainment | `a29a4f70684744cb9eb9aceebd33ad5a` |
| Ethereum | `111ba8e579284514aedb3fc1b82eed9f` |
| Exercise | `57fd3c86185c45f09a7cff5cbfdb0c27` |
| Financial regulation | `0e8cf43f8f6545139c1fc7c232278684` |
| Fintech | `eaad46bef43f440abd5821e037896332` |
| Foreign Policy | `94c408546496400c903b45e4a31c8b28` |
| Gaming & e-sports | `c401cd000cf94ff6a3c93729fbd613b1` |
| Gaming industry | `575b2c2832c34de48ad9aef672221571` |
| Geo Documentation ⚠️ | `46162f0614d448b2b00d8c3bbd7e5194` |
| Global health | `1b4dcfb75b1442fa99906677b4e7c9b4` |
| Global trade | `bed573eee6e94d65960986595909a4a8` |
| Golf | `d67b87a7355b418b9a2fbdf4762022f3` |
| Gymnastics | `0d21976bc80045f6b3469f44a9dc7291` |
| Health | `b97f07a619fd4ab0bb3d8296a8a26ab9` |
| Heat exposure therapy | `d3aed7c370a84d0e82e3d92da7e145cf` |
| Hinduism | `4ab4fad9b1334ad4b9b7c81c7dd3a709` |
| History | `77064a4cd50b4977b6d913ebb171ebcf` |
| Hobbies | `940e5954a7a949fbb972ea577f2109b9` |
| Ice hockey | `165dd062980542b186c8a58fcc0fc058` |
| Immigration | `7f41e681c73d44cda1331b55ba1877b4` |
| Immigration & refugees | `1c971c39ae8145f88bfabc12c3978468` |
| Industries | `6d4e0ecaa8334a78a320b129f74bf0db` |
| Investing | `d53d7c84500945abb9506762e1494746` |
| Israel-Gaza war | `4ed3162278994f29bde7a6f7cf60e28e` |
| Judaism | `d75abc02ade842e79531726362289e96` |
| Knowledge graphs | `11c8cfc2b5f944f5919162c5d9b70582` |
| MMA | `58e55b0abde449ffabe21241eec16e7f` |
| Martial arts | `d70d66d51cf8409fab5d274670032619` |
| Mental health | `a39ae1343f714daf83d0d3657497412a` |
| NFTs & Digital Art | `6a0ec4befb5b5680a38b9cb7ec768c41` |
| National Football League (NFL) | `062a525391374fbe8cfd820b605d2d63` |
| Neuroscience | `405d2242e7f146b89b16e3d568ab2528` |
| Nutrition | `0cd771065e1e478496dae4d191861081` |
| Open source | `6eb4308f48a14355be2bc2a20cf0792a` |
| Open-source AI | `155dc256c3644cc5be111014b7d809f2` |
| Parenting | `2e238bec0368420ebba9a86693a4150e` |
| Peptides | `a9f6c5d098b5452a9b5c3511f0a0c0b3` |
| Personal development | `1c23f42e6b36458a8725b7567749e8c4` |
| Philosophy | `44beda6da5b04c20be9f4f4e92f7f864` |
| Physics | `da661eaaeee34d238cb43e6de82982a0` |
| Podcasts | `d36e807ffe59477fb16838f9561c4f0b` |
| Powerlifting | `135b9758609e456face1605ccfbfd652` |
| Psychedelics | `c910a50c803749b1a5f19ee0a3dfaacc` |
| Psychology | `cef1b6ac3631482587478699583337c4` |
| Public healthcare | `b1de44d817af45399cab060d85995ae1` |
| Quantum computing | `ae0afb97ed0548669db417cde88abf54` |
| Real estate | `5d9a7034c5ec45bd886ac78f3cee5d0d` |
| Religion | `88896f57907844bdb6ee6007e18a37b0` |
| Religious sacred texts | `984a54e334b440cea21dc7555630e661` |
| Robotics | `34cc57567f7d407f9b79817f8e23a52e` |
| Russia-Ukraine war | `4b7b31c1c61f4d3ca16f9c4d94149638` |
| Science | `599315c80c2b412f83eb4e6e13fc8df2` |
| Sleep | `896f1954db7f41ab91fc654b5c902001` |
| Software | `4ab15e4971e548b88ce196448744a2b4` |
| Software engineering | `9b9e52f3d2c0416cbad209228db189b8` |
| Space & astronomy | `523873fab5de4b9586606efece5dfcdf` |
| Spirituality | `83bee197c0354e11b80735838d82a5e5` |
| Sports | `1f11fa0e05e94822ba96f970d835a7e8` |
| Startups | `d8028a1a5ad64733858ffc0eb24c2400` |
| Strongman | `bfbd4acf67924a7daa54a735fa04d0c5` |
| Tech policy | `996d19f2ebc8420d82b589a066363e32` |
| Technology | `5a98682790a1473385dc92263503f93b` |
| U.S. politics & government | `b4bcc1e654e94a438cf75c198156dddd` |
| Venture Capital | `043ab1cbe1304bf9bc261f7fdd53ac28` |
| Virtual reality | `4cd8fe31ffe145c5897da5286d505150` |
| Wars & conflicts | `5d050707bc5840119b1e81ad3adb6244` |
| World affairs | `49fbca0730974581a9f0300d52fd22d6` |
| Yoga | `7b835f965ac24378a7c9df38bdb6f46a` |

### **Featured topics:**

| Topics | ID | Space |
| --- | --- | --- |
| **The stablecoin race** | `c6d646f705e14054b06a455c7e7b2f1c` | Crypto |
| **CLARITY Act** | `9e826d1ac96c4447a20224ed9f218470` | Crypto |
| **Ethereum Foundation crisis and reinvention** | `e35f18d8450841599460e5190a438191` | Crypto |
| **Bitcoin's post-quantum debate** | `ab6a4d78043e4375871c5e5b9d5bd9ea` | Crypto |
| **Inside the Launch of Claude Mythos** | `907e64dfdcb64b7f88d153bf06048b0d` | AI |
| **AI Data Center Gold Rush** | `63f8a097975243b9bc7c05987ee608ea` | AI |
| **Venture capital funding** | `7225361b107d4a07b606b083340392bd` | AI |
| **Hantavirus Outbreak** | `a8b8fa49f3e44f0b92a0bd0da7b9aeec` | Health |
| **Ebola outbreak** | `b499957bc8dd43aeb9672d3850a25d08` | Health |
| **US Health Policy & Drug Pricing** | `3ebb9113418549abad8750d298bea067` | Health |
| **Strait of hormuz blockade** | `265e96890c874333a68b838cf443e16c`  | World Affairs |
| **Iran War** | `10ed4f5ac9b84917ac801d0478fdbb69` | World Affairs |
| **Rising US-Cuba tensions** | `e0017b27d36845868cf10f640bcf88ec` | World Affairs (Space entity) |
| **Rising US-Cuba tensions** | `7b650a3be2f767a53c338a14bd0df78f` | Space ID |
| **Russia-Ukraine war** | `4b7b31c1c61f4d3ca16f9c4d94149638` | World Affairs |
| **Trump administration** | `f623580d33c442d1990cf39e719cf289` | US Politics |
| **US midterm elections** | `1258ebd110cb410481e01b99066e34ec` | US midterm elections (Space entity) |
| **US midterm elections** | `a506519d658da1114f5aa599ce207876` | Space ID |
| **US Congress** | `4ad9ecb9577148778f5dd4af418d0a14` | US Politics |

### **Datasets spaces:**

| Space | Space ID |
| --- | --- |
| **Crypto datasets** | `5908c73ad336472ccbd983491d2d17e4` |
| **AI datasets** | `941964642f4d3e70ef48f54a3915277d` |
| **Health datasets** | `44eb138f564fbed6ed9ce543de1b849c` |
| **World affairs datasets** | `da96a4c26e718bfa6c27c3b1f3c316cd` |
| **U.S. Politics datasets** | `1b3d2963d14de99d4e440000125edb65` |

---

