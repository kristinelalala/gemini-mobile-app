
import { ActivityType, DayItinerary } from './types';

export const ITINERARY_DATA: DayItinerary[] = [
  {
    date: '2024-04-06',
    displayDate: '4月06日',
    weekday: '週六',
    title: '抵達 & 淺草行',
    heroImage: 'https://i.postimg.cc/qBcPwk9x/20230225-DSC00850.webp', // 淺草雷門燈籠
    weather: { temp: '16°', high: '19°', low: '12°', condition: '多雲時晴', icon: 'cloud-sun' },
    clothingSuggestion: '氣溫舒適微涼，建議穿著薄長袖 T 恤搭配輕薄外套，方便穿脫。',
    activities: [
      {
        id: '1-0',
        title: '搭乘虎航 (IT216)',
        jpTitle: 'Tigerair Taiwan IT216',
        time: '00:10',
        location: '桃園機場 T1 -> 羽田機場 T3',
        notes: [
          '訂位代號：TBBBTQ',
          '航班時間：4/6 00:10 AM',
          '前一天上 Visit Japan Web 辦理入境手續'
        ],
        type: ActivityType.TRANSPORT,
        important: true,
        imageUrl: 'https://i.postimg.cc/pLkV6f44/hero-20251111-151627.jpg',
        coordinates: { lat: 35.5494, lng: 139.7798 } // Haneda T3
      },
      {
        id: '1-1',
        time: '04:30',
        title: '飯店 Check in',
        jpTitle: '品川プリンスホテル アネックスタワー',
        location: '品川王子大飯店 別館',
        notes: ['予約番号：#1668496608', '前往飯店寄放行李、補眠'],
        type: ActivityType.HOTEL,
        mapQuery: 'Shinagawa Prince Hotel Annex Tower',
        imageUrl: 'https://i.postimg.cc/rFSdytRF/main-double-room-slider.jpg',
        coordinates: { lat: 35.627931, lng: 139.738982 }
      },
      {
        id: '1-2',
        title: '午餐：築地市場',
        jpTitle: '築地市場',
        location: '築地市場',
        notes: ['吃海鮮', '生魚片'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/C584xLby/cc8dda162b0b7b6cae222fdd91f2fdb5.jpg',
        coordinates: { lat: 35.665406, lng: 139.770678 }
      },
      {
        id: '1-3',
        title: '淺草寺',
        jpTitle: '淺草寺 雷門 (風雷神門)',
        location: '淺草寺',
        notes: ['觀光參拜', '雷門拍照'],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/HxqQRDR2/20230523-002525-8836ab82-w1920.png',
        coordinates: { lat: 35.714765, lng: 139.796655 }
      },
      {
        id: '1-4',
        title: '晚餐：炸豬排',
        jpTitle: 'Tonkatsu Oribe',
        location: 'Tonkatsu Oribe',
        notes: ['人氣炸豬排店'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/cLktPG8C/3842.jpg',
        coordinates: { lat: 35.7132, lng: 139.7970 }
      },
      {
        id: '1-5',
        title: '唐吉軻德＆便利商店',
        jpTitle: '唐吉訶德 淺草店',
        location: '唐吉訶德 淺草店',
        notes: ['吃飽晃晃', '驚安の殿堂逛生活小物', 'Lawson零食飲料採買'],
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
    title: '晴空塔、銀座與夜景',
    heroImage: 'https://i.postimg.cc/6QGSvwry/lgra7vcg7b2g3zcts3sl.jpg', // 晴空塔
    weather: { temp: '18°', high: '22°', low: '14°', condition: '晴朗', icon: 'sun' },
    clothingSuggestion: '天氣晴朗溫暖，中午可能稍熱，建議穿著短袖或薄襯衫，並攜帶一件薄外套備用。',
    activities: [
      {
        id: '2-1',
        time: '10:30',
        title: '早午餐：敘敘苑',
        jpTitle: '叙々苑 東京スカイツリータウン・ソラマチ店',
        location: '晴空塔',
        notes: ['吃飯時間：10:30 - 12:30', '高空景觀燒肉', '1月須預約'],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: 'https://i.postimg.cc/L8gm4cb2/S-129777667-0.jpg',
        mapUrl: 'https://maps.app.goo.gl/gpM2CE25UEK7Knfb7',
        coordinates: { lat: 35.710063, lng: 139.8107 }
      },
      {
        id: '2-2',
        title: '小網神社',
        jpTitle: '小網神社',
        location: '小網神社',
        notes: [
          '參拜、求財、洗錢',
          '洗左手→右手→嘴巴→左手→握把',
          '投錢（5圓日幣一枚）',
          '搖鈴、二鞠躬、二拍手、一鞠躬'
        ],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/cCdJrF85/f92279b2.png',
        coordinates: { lat: 35.684347, lng: 139.778477 }
      },
      {
        id: '2-3',
        title: '千鳥之淵－賞櫻',
        jpTitle: '千鳥ヶ淵公園',
        location: '千鳥之淵公園',
        notes: ['賞櫻勝地', '划船'],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/bNWj56wc/02-165067.png',
        coordinates: { lat: 35.694602, lng: 139.746014 }
      },
      {
        id: '2-4',
        title: '銀座－逛街',
        jpTitle: '銀座',
        location: '銀座',
        notes: ['pain･maison Ginza (吃鹽可頌)', '無印良品 銀座旗艦店'],
        type: ActivityType.SHOPPING,
        important: true,
        imageUrl: 'https://i.postimg.cc/XJHPCJZv/S-129777669-0.jpg',
        coordinates: { lat: 35.6735, lng: 139.7665 }
      },
      {
        id: '2-5',
        title: '晚餐：烤飛魚鹽味拉麵',
        jpTitle: '焼きあご塩らー麺たかはし 銀座店',
        location: '烤飛魚鹽味拉麵 高橋',
        notes: ['烤飛魚鹽拉麵高橋'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/2jqYxRCQ/38ca0904c1ef3509f9bf5a45e582ea64-1024x434.jpg',
        mapUrl: 'https://maps.app.goo.gl/GkvQGLh3n9xUCGiR7',
        coordinates: { lat: 35.670355, lng: 139.764519 }
      },
      {
        id: '2-6',
        title: '麻布台之丘 森JP塔',
        jpTitle: 'Azabudai Hills Mori JP Tower',
        location: '麻布台之丘',
        notes: [
          '遠眺東京鐵塔',
          '在1F搭S2電梯去34樓',
          '於Sky Room Cafe & Bar消費最低800日圓',
          '另加收500日圓入場費',
          '開放至20:00止'
        ],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/y8TCN7TW/S-129777668-0.jpg',
        coordinates: { lat: 35.660683, lng: 139.745564 }
      },
    ],
  },
  {
    date: '2024-04-08',
    displayDate: '4月08日',
    weekday: '週一',
    title: '原宿、新宿與目黑川',
    heroImage: 'https://i.postimg.cc/4y8w0F6j/20231107-092508-a96ec287-w1920.webp', // 目黑川櫻花
    weather: { temp: '17°', high: '20°', low: '13°', condition: '多雲', icon: 'cloud' },
    clothingSuggestion: '多雲天氣，氣溫適中。推薦穿著舒適的長袖衛衣搭配長褲，適合一整天的逛街行程。',
    activities: [
      {
        id: '3-1',
        title: '吉伊卡哇 & 3COINS',
        jpTitle: 'kiddy land ハラジュクテン',
        location: '原宿',
        notes: ['Kiddy Land (吉伊卡哇)', '3COINS 原宿本店'],
        type: ActivityType.SHOPPING,
        imageUrl: 'https://i.postimg.cc/zX5tQR90/85dd747bfdb911185c44aebfe59d8c2a.png',
        coordinates: { lat: 35.6677, lng: 139.7066 }
      },
      {
        id: '3-2',
        title: '午餐：Path',
        jpTitle: 'Path',
        location: 'Path',
        notes: ['人氣餐酒館/咖啡廳'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/k5Z1JHL5/sukurinshotto-2024-03-04-155532.png',
        coordinates: { lat: 35.6644, lng: 139.6926 }
      },
      {
        id: '3-3',
        title: '新宿－逛街',
        jpTitle: '新宿駅',
        location: '新宿駅',
        notes: ['新宿御苑', 'OS DRUG 新宿西口店', '歌舞伎町'],
        type: ActivityType.SIGHTSEEING,
        imageUrl: 'https://i.postimg.cc/wTvm2B7F/a0003759-main.png',
        coordinates: { lat: 35.6896, lng: 139.7005 }
      },
      {
        id: '3-4',
        time: '17:30',
        title: '目黑川－賞夜櫻',
        jpTitle: '中目黒駅',
        location: '中目黑站 / 池尻大橋站',
        notes: ['點燈時間 17:30~20:00', '必拍【櫻橋】、【別所橋】'],
        type: ActivityType.SIGHTSEEING,
        important: true,
        imageUrl: 'https://i.postimg.cc/WzftCMhf/20230114-171520-c893c6b9-w1920.png',
        coordinates: { lat: 35.6455, lng: 139.6992 }
      },
      {
        id: '3-5',
        time: '20:30',
        title: '晚餐：六歌仙燒肉',
        jpTitle: '六歌仙 新宿西口大ガード店',
        location: '新宿',
        notes: ['吃飯時間：20:30 - 22:30', '1月須預約'],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: 'https://i.postimg.cc/T3bhN5G4/P046240765-480.jpg',
        mapUrl: 'https://maps.app.goo.gl/Tv991Piimsx4dTuM6',
        coordinates: { lat: 35.6931, lng: 139.6996 }
      },
    ],
  },
  {
    date: '2024-04-09',
    displayDate: '4月09日',
    weekday: '週二',
    title: '澀谷、秋葉原與壽喜燒',
    heroImage: 'https://i.postimg.cc/4y8w0F6j/20231107-092508-a96ec287-w1920.webp', // 澀谷/東京街頭
    weather: { temp: '15°', high: '18°', low: '11°', condition: '陰天', icon: 'cloud' },
    clothingSuggestion: '今日氣溫稍降，陰天可能有風。建議穿著有厚度的長袖或帽T，並攜帶防風外套。',
    activities: [
      {
        id: '4-1',
        time: '11:00',
        title: '飯店 Check Out！',
        jpTitle: '品川プリンスホテル',
        location: '品川王子大飯店 別館',
        notes: ['退房時間：11:00', '行李寄放飯店'],
        type: ActivityType.HOTEL,
        important: true,
        imageUrl: 'https://i.postimg.cc/jqWWnFmb/d7725575.jpg',
        coordinates: { lat: 35.627931, lng: 139.738982 }
      },
      {
        id: '4-2',
        title: '秋葉原',
        jpTitle: '秋葉原駅',
        location: '秋葉原駅',
        notes: ['逛動漫、電器'],
        type: ActivityType.SHOPPING,
        imageUrl: 'https://i.postimg.cc/VLrN50St/20230428-135124-b546c095-w1920.png',
        coordinates: { lat: 35.6984, lng: 139.7731 }
      },
      {
        id: '4-3',
        title: '午餐：MAGURO to SHARI',
        jpTitle: 'Maguro-to-Shari Shibuya',
        location: '澀谷',
        notes: ['吃壽司', '最後一逛'],
        type: ActivityType.FOOD,
        imageUrl: 'https://i.postimg.cc/k4GmZLKr/image.png',
        mapUrl: 'https://maps.app.goo.gl/2U3g3oQD6BvgG2Qb9',
        coordinates: { lat: 35.660350, lng: 139.701850 }
      },
      {
        id: '4-4',
        time: '19:00',
        title: '回飯店拿行李',
        jpTitle: '品川プリンスホテル',
        location: '品川王子大飯店 別館',
        notes: ['必須於19:00前離開飯店'],
        type: ActivityType.TRANSPORT,
        important: true,
        imageUrl: 'https://i.postimg.cc/sx1gYvwL/png.png',
        coordinates: { lat: 35.627931, lng: 139.738982 }
      },
      {
        id: '4-5',
        time: '20:00',
        title: '晚餐：壽喜燒 ちんや',
        jpTitle: 'すき焼 ちんや 浅草本店',
        location: '淺草',
        notes: ['吃飯時間：20:00 - 22:00', '1月須預約'],
        type: ActivityType.FOOD,
        important: true,
        imageUrl: "https://i.postimg.cc/2yv8cPNQ/suki-shaochin'ya-Sukiyaki-Chinya-Asakusa-zhao-he-qi-jia-bai-nian-shou-xi-shao-ming-dian-dong-jing-qian-cao.jpg",
        mapUrl: 'https://maps.app.goo.gl/RFqTHNt6fPJqoT4z6',
        coordinates: { lat: 35.71088, lng: 139.79255 }
      },
    ],
  },
  {
    date: '2024-04-10',
    displayDate: '4月10日',
    weekday: '週三',
    title: '回台灣',
    heroImage: 'https://i.postimg.cc/28Vx6GFG/3cd8dfb5-4b48-40d5-8367-97225cf5d4d3.jpg', // 機場跑道/飛機
    weather: { temp: '19°', high: '23°', low: '15°', condition: '晴朗', icon: 'sun' },
    clothingSuggestion: '回程搭機，建議穿著寬鬆、不緊繃的休閒衣物，以確保飛行途中的舒適度。',
    activities: [
      {
        id: '5-1',
        time: '05:15',
        title: '回台灣！',
        jpTitle: '羽田空港 第3ターミナル',
        location: '品川站 -> 羽田機場',
        notes: [
          '搭乘虎航 (IT217)',
          '訂位代號：TBBBTQ',
          '航班時間：4/10 05:25 AM',
          '搭直達車回品川',
          '轉乘京急線前往羽田機場第三航廈'
        ],
        type: ActivityType.TRANSPORT,
        important: true,
        imageUrl: 'https://i.postimg.cc/pLkV6f44/hero-20251111-151627.jpg',
        coordinates: { lat: 35.5445, lng: 139.7686 }
      },
    ],
  },
];
