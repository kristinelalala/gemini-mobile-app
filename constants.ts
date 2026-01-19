import { ActivityType, DayItinerary } from './types';

export const ITINERARY_DATA: DayItinerary[] = [
  {
    date: '2024-04-06',
    displayDate: '4月06日',
    weekday: '週六',
    title: '抵達＆上野、淺草遊',
    heroImage: 'https://i.postimg.cc/vHjCbms9/20230225-DSC00850.webp',
    weather: { temp: '16°', high: '19°', low: '12°', condition: '多雲時晴', icon: 'cloud-sun' },
    clothingSuggestion: '氣溫舒適微涼，建議穿著薄長袖 T 恤搭配輕薄外套，方便穿脫。',
    activities: [
      {
        id: '1-0',
        title: '搭乘虎航 (IT216)',
        jpTitle: 'Tigerair Taiwan IT216',
        time: '00:10',
        location: '桃園機場 T1 -> 品川王子大飯店',
        notes: [
          '訂位代號：TBBBTQ',
          '航班時間：4/6 00:10 AM',
          '前一天上Visit Japan web辦入境手續'
        ],
        type: ActivityType.TRANSPORT,
        important: true,
        imageUrl: 'https://i.postimg.cc/pLkV6f44/hero-20251111-151627.jpg',
        coordinates: { lat: 35.5494, lng: 139.7798 }
      },
      {
        id: '1-1',
        time: '04:30',
        title: '飯店Check in！',
        jpTitle: '品川プリンスホテル アネックスタワー',
        location: '品川王子大飯店 別館',
        notes: ['予約番号：#1668496608', '補眠至10:00 - 10:30出門'],
        type: ActivityType.HOTEL,
        mapQuery: 'Shinagawa Prince Hotel Annex Tower',
        imageUrl: 'https://i.postimg.cc/rFSdytRF/main-double-room-slider.jpg',
        coordinates: { lat: 35.627931, lng: 139.738982 }
      },
      {
        id: '1-2',
        title: '午餐：とんかつ山家',
        jpTitle: 'とんかつ山家 上野店',
        location: '上野 (炸豬排)',
        notes: ['吃飯時間：11:00 - 13:00', '只能現場排隊'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/k5jrbvSG/aacaac97034ed9bb207528f6a18b05e1.webp',
        coordinates: { lat: 35.707826, lng: 139.776628 }
      },
      {
        id: '1-3',
        title: '上野阿美橫町',
        jpTitle: 'アメ横商店街',
        location: '上野',
        notes: ['逛超便宜藥妝（OS Drugs）、鞋店'],
        type: ActivityType.SHOPPING,
        imageUrl: 'https://i.postimg.cc/hPM0gZRX/20240127-170506-1fb1a47e-w1920.webp',
        coordinates: { lat: 35.7088, lng: 139.7743 }
      },
      {
        id: '1-4',
        title: '上野公園 (賞櫻)',
        jpTitle: '上野恩賜公園',
        location: '上野公園',
        notes: ['有時間再去！', '以免到淺草寺天已經黑了'],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/CL0vwfBy/1679333194-72688.jpg',
        coordinates: { lat: 35.7140, lng: 139.7741 }
      },
      {
        id: '1-5',
        title: '淺草寺',
        jpTitle: '淺草寺 雷門 (風雷神門)',
        location: '淺草',
        notes: [
          '拍雷門、參拜',
          '賽錢箱投入香油錢５日圓',
          '鞠躬兩次→合掌拍手兩次',
          '→心中祈禱→最後再鞠躬一次'
        ],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/HxqQRDR2/20230523-002525-8836ab82-w1920.png',
        coordinates: { lat: 35.714765, lng: 139.796655 }
      },
      {
        id: '1-6',
        title: '晚餐：すき燒 ちんや',
        jpTitle: 'すき燒 ちんや 浅草本店',
        location: '淺草 (壽喜燒)',
        notes: ['吃飯時間：20:30 - 22:00', '２月須預約'],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: "https://i.postimg.cc/2yv8cPNQ/suki-shaochin'ya-Sukiyaki-Chinya-Asakusa-zhao-he-qi-jia-bai-nian-shou-xi-shao-ming-dian-dong-jing-qian-cao.jpg",
        mapUrl: 'https://maps.app.goo.gl/RFqTHNt6fPJqoT4z6',
        coordinates: { lat: 35.7119, lng: 139.7963 }
      },
      {
        id: '1-7',
        title: '唐吉軻德+便利商店',
        jpTitle: '唐吉訶德 淺草店',
        location: '淺草',
        notes: ['驚安の殿堂', '淺草分店四層樓超好逛'],
        type: ActivityType.SHOPPING,
        imageUrl: 'https://i.postimg.cc/k4KVVVYJ/webp.png',
        coordinates: { lat: 35.7136, lng: 139.7938 }
      },
    ],
  },
  {
    date: '2024-04-07',
    displayDate: '4月07日',
    weekday: '週日',
    title: '賞櫻日＆原宿、新宿逛',
    heroImage: 'https://i.postimg.cc/bv05xHtX/8b85af3275e895ce98bb20475364ab49.webp',
    weather: { temp: '18°', high: '22°', low: '14°', condition: '晴朗', icon: 'sun' },
    clothingSuggestion: '天氣晴朗溫暖，建議穿著短袖或薄襯衫，並攜帶一件薄外套備用。',
    activities: [
      {
        id: '2-1',
        title: '早午餐：No.4',
        jpTitle: 'No.4',
        location: '千代田區',
        notes: ['熱門早午餐', '只能現場排隊'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/pdRck5xv/d7739003.jpg',
        coordinates: { lat: 35.6865, lng: 139.7363 }
      },
      {
        id: '2-2',
        title: '千鳥之淵',
        jpTitle: '千鳥ヶ淵公園',
        location: '千鳥之淵',
        notes: ['賞櫻勝地'],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/bNWj56wc/02-165067.png',
        coordinates: { lat: 35.694602, lng: 139.746014 }
      },
      {
        id: '2-3',
        title: '新宿（逛街＋參拜）',
        jpTitle: '皆中稲荷神社',
        location: '新宿 / 新大久保',
        notes: [
            '皆中稻荷神社參拜',
            '神社時間：09:00 - 17:00',
            '賽錢箱投入香油錢５日圓',
            '鞠躬兩次→合掌拍手兩次',
            '→心中祈禱→最後再鞠躬一次'
        ],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/SNYPKpV6/20190929222551-30.jpg',
        coordinates: { lat: 35.7011, lng: 139.7003 }
      },
      {
        id: '2-4',
        title: '原宿（逛街）',
        jpTitle: 'kiddy land ハラジュクテン',
        location: '原宿',
        notes: [
          '吉伊卡哇 Land 原宿店',
          '3COINS 原宿旗艦店'
        ],
        type: ActivityType.SHOPPING,
        imageUrl: 'https://i.postimg.cc/zX5tQR90/85dd747bfdb911185c44aebfe59d8c2a.png',
        coordinates: { lat: 35.6677, lng: 139.7066 }
      },
      {
        id: '2-5',
        title: '目黑川 (賞夜櫻)',
        jpTitle: '中目黒駅',
        location: '中目黑 / 池尻大橋',
        notes: [
            '點燈時間：17:30～20:00', 
            '必拍【櫻橋】、【別所橋】'
        ],
        type: ActivityType.SIGHTSEEING,
        important: true,
        imageUrl: 'https://i.postimg.cc/WzftCMhf/20230114-171520-c893c6b9-w1920.png',
        coordinates: { lat: 35.6455, lng: 139.6992 }
      },
      {
        id: '2-6',
        title: '晚餐：Yakitori Kakure',
        jpTitle: 'Yakitori Kakure 中目黒店',
        location: '中目黑',
        notes: ['吃飯時間：20:15 - 22:00', '２月須預約'],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: 'https://i.postimg.cc/kXLkN5DZ/8b106b70b1b93819988d259939bd5c78.jpg',
        coordinates: { lat: 35.6429, lng: 139.6983 }
      },
    ],
  },
  {
    date: '2024-04-08',
    displayDate: '4月08日',
    weekday: '週一',
    title: '築地、銀座、美術館',
    heroImage: 'https://i.postimg.cc/tgFKrG8B/uniqloginza01.jpg',
    weather: { temp: '17°', high: '20°', low: '13°', condition: '多雲', icon: 'cloud' },
    clothingSuggestion: '多雲天氣，氣溫適中。推薦穿著舒適的長袖衛衣搭配長褲，適合一整天的逛街行程。',
    activities: [
      {
        id: '3-1',
        title: '早午餐：築地市場',
        jpTitle: '築地市場',
        location: '築地',
        notes: ['吃海鮮、生魚片', '吃飯時間：10:00 - 12:00'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/C584xLby/cc8dda162b0b7b6cae222fdd91f2fdb5.jpg',
        coordinates: { lat: 35.665406, lng: 139.770678 }
      },
      {
        id: '3-2',
        title: '小網神社',
        jpTitle: '小網神社',
        location: '日本橋',
        notes: [
          '求財聖地參拜、洗錢/鈔票',
          '賽錢箱投入香油錢５日圓',
          '鞠躬兩次→合掌拍手兩次',
          '→心中祈禱→最後再鞠躬一次'
        ],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/cCdJrF85/f92279b2.png',
        coordinates: { lat: 35.684347, lng: 139.778477 }
      },
      {
        id: '3-3',
        title: '銀座（逛街）',
        jpTitle: '銀座',
        location: '銀座',
        notes: [
          '買pain･maison Ginza鹽可頌', 
          '無印良品旗艦店', 
          'Uniqlo旗艦店（印凱莉T-shirt）'
        ],
        type: ActivityType.SHOPPING,
        imageUrl: 'https://i.postimg.cc/XJHPCJZv/S-129777669-0.jpg',
        coordinates: { lat: 35.6735, lng: 139.7665 }
      },
      {
        id: '3-4',
        title: '根津美術館',
        jpTitle: '根津美術館',
        location: '南青山',
        notes: ['打烊時間：17:00'],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/dQNM16FJ/20220408-103446-2948bc0e-w1920.webp',
        coordinates: { lat: 35.6631, lng: 139.7186 }
      },
      {
        id: '3-5',
        title: '晚餐：入鹿 TOKYO 六本木',
        jpTitle: '入鹿TOKYO 六本木',
        location: '六本木',
        notes: ['米其林拉麵', '打烊時間：19:40', '只能現場排隊'],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: 'https://i.postimg.cc/g2n2jjQt/images.jpg',
        coordinates: { lat: 35.6644, lng: 139.7307 }
      },
      {
        id: '3-6',
        title: '晚餐備案：肉男 Meat Man',
        jpTitle: '肉男 Meat Man',
        location: '六本木',
        notes: ['超紅居酒屋', '吃飯時間：19:30 or 20:00', '３月須預約'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/MTf0jBSb/photo4jpg.jpg',
        coordinates: { lat: 35.6628, lng: 139.7315 }
      },
    ],
  },
  {
    date: '2024-04-09',
    displayDate: '4月09日',
    weekday: '週二',
    title: '晴空塔、澀谷、東京夜景',
    heroImage: 'https://i.postimg.cc/6QGSvwry/lgra7vcg7b2g3zcts3sl.jpg',
    weather: { temp: '15°', high: '18°', low: '11°', condition: '陰天', icon: 'cloud' },
    clothingSuggestion: '今日氣溫稍降，陰天可能有風。建議穿著有厚度的長袖或帽T，並攜帶防風外套。',
    activities: [
      {
        id: '4-1',
        title: '早午餐：敘敘苑',
        jpTitle: '叙々苑 東京スカイツリータウン・ソラマチ店',
        location: '晴空塔 30F',
        notes: [
          '晴空塔燒肉', 
          '吃飯時間：10:30 - 12:30', 
          '予約名：Lin YunLu,Kristine'
        ],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: 'https://i.postimg.cc/L8gm4cb2/S-129777667-0.jpg',
        mapUrl: 'https://maps.app.goo.gl/gpM2CE25UEK7Knfb7',
        coordinates: { lat: 35.710063, lng: 139.8107 }
      },
      {
        id: '4-2',
        title: '澀谷（逛街）',
        jpTitle: '渋谷',
        location: '澀谷',
        notes: ['逛街、忠犬八公銅像', '買Kenyan Shibuya外帶奶茶'],
        type: ActivityType.SHOPPING,
        imageUrl: 'https://i.postimg.cc/MHSnjwVT/Hachiko-Statue-tokyo-featured.jpg',
        coordinates: { lat: 35.6580, lng: 139.7016 }
      },
      {
        id: '4-3',
        title: 'SHIBUYA SKY',
        jpTitle: 'Shibuya Sky',
        location: '澀谷 Scramble Square',
        notes: ['遠眺東京鐵塔夜景', '夜景時間：16:00 - 18:00', '３月須預約'],
        type: ActivityType.SIGHTSEEING,
        important: true,
        imageUrl: 'https://i.postimg.cc/7P07Ps09/DSCF8358.jpg',
        coordinates: { lat: 35.6585, lng: 139.7023 }
      },
      {
        id: '4-4',
        title: '晚餐：梅丘壽司美登利',
        jpTitle: '梅丘寿司の美登利 渋谷店',
        location: '澀谷',
        notes: ['２月須預約'],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: 'https://i.postimg.cc/DfrTCnQd/Midori-zushi-2018-0005s.webp',
        coordinates: { lat: 35.6579, lng: 139.6994 }
      },
      {
        id: '4-5',
        title: '回飯店拿行李',
        jpTitle: '品川プリンスホテル',
        location: '品川王子大飯店 別館',
        notes: ['最晚須於22:30拿完行李離開飯店', '搭京急線末班車23:00去羽田機場T3'],
        type: ActivityType.HOTEL,
        important: true,
        imageUrl: 'https://i.postimg.cc/sx1gYvwL/png.png',
        coordinates: { lat: 35.627931, lng: 139.738982 }
      },
    ],
  },
  {
    date: '2024-04-10',
    displayDate: '4月10日',
    weekday: '週三',
    title: '回台灣',
    heroImage: 'https://i.postimg.cc/28Vx6GFG/3cd8dfb5-4b48-40d5-8367-97225cf5d4d3.jpg',
    weather: { temp: '19°', high: '23°', low: '15°', condition: '晴朗', icon: 'sun' },
    clothingSuggestion: '回程搭機，建議穿著寬鬆、不緊繃的休閒衣物，以確保飛行途中的舒適度。',
    activities: [
      {
        id: '5-1',
        time: '05:15',
        title: '回台灣！（虎航IT217）',
        jpTitle: '羽田空港 第3ターミナル',
        location: '羽田機場 T3',
        notes: [
          '訂位代號：TBBBTQ',
          '航班時間：4/10 05:25 AM'
        ],
        type: ActivityType.TRANSPORT,
        important: true,
        imageUrl: 'https://i.postimg.cc/pLkV6f44/hero-20251111-151627.jpg',
        coordinates: { lat: 35.5445, lng: 139.7686 }
      },
    ],
  },
];