export const W = 900, H = 680;
export const latMin = 48.882, latMax = 48.952;
export const lngMin = 24.672, lngMax = 24.758;
export const xy = (lat, lng) => [
  ((lng - lngMin) / (lngMax - lngMin)) * W,
  (1 - (lat - latMin) / (latMax - latMin)) * H,
];
export const R200 = 17, R1K = 87;
export const hav = (a, b) => {
  const R=6371000, dLat=(b[0]-a[0])*Math.PI/180, dLng=(b[1]-a[1])*Math.PI/180;
  const x=Math.sin(dLat/2)**2+Math.cos(a[0]*Math.PI/180)*Math.cos(b[0]*Math.PI/180)*Math.sin(dLng/2)**2;
  return Math.round(R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x)));
};
export const RAT = [48.9227, 24.7104];


export const KG_COM = [
  {n:'№1 Калинонька',lat:48.9272,lng:24.7175},{n:'№2 Малюк',lat:48.9221,lng:24.7041},
  {n:'№3 Бджілка',lat:48.9205,lng:24.6982},{n:'№4 Калинова сопілка',lat:48.9324,lng:24.7248},
  {n:'№7 Золотий ключик',lat:48.9218,lng:24.7055},{n:'№11 Пізнайко',lat:48.9145,lng:24.7112},
  {n:'№15 Гуцулочка',lat:48.9158,lng:24.7321},{n:'№16 Сонечко',lat:48.9192,lng:24.7038},
  {n:'№18 Зернятко',lat:48.9265,lng:24.7314},{n:'№19 Троянда',lat:48.9385,lng:24.6932},
  {n:'№20 Росинка',lat:48.9248,lng:24.7355},{n:'№23 Дударик',lat:48.9065,lng:24.6854},
  {n:'№27 Карпатська казка',lat:48.9362,lng:24.7412},{n:'№28 Квітка Карпат',lat:48.9288,lng:24.7431},
  {n:'№30 Ластівка',lat:48.9225,lng:24.7025},{n:'№34 Незабудка',lat:48.9451,lng:24.6928},
  {n:'№35 Вишиванка',lat:48.9355,lng:24.6882},{n:'№36 Віночок',lat:48.9022,lng:24.6815},
];

export const LYCEES = [
  {n:'Ліцей №1',lat:48.9278,lng:24.7037},{n:'Ліцей №2',lat:48.9312,lng:24.7195},
  {n:'Ліцей №3',lat:48.9204,lng:24.7031},{n:'Ліцей №5',lat:48.9213,lng:24.7159},
  {n:'Ліцей №10',lat:48.9318,lng:24.7385},{n:'Ліцей №11',lat:48.9205,lng:24.7188},
  {n:'Ліцей №13',lat:48.9286,lng:24.7087},{n:'Ліцей №15',lat:48.9135,lng:24.7412},
  {n:'Ліцей №16',lat:48.9303,lng:24.7246},{n:'Ліцей №19',lat:48.9209,lng:24.7391},
  {n:'Ліцей №23',lat:48.9155,lng:24.6958},{n:'Ліцей №24',lat:48.9445,lng:24.6912},
  {n:'Ліцей №25',lat:48.9325,lng:24.7214},
];

export const UNIS = [
  {n:'ІФНТУНГ',sub:'Нафти і газу',lat:48.9293,lng:24.6964},
  {n:'ПНУ',sub:'ім. Стефаника',lat:48.9150,lng:24.7010},
  {n:'ІФНМУ',sub:'Медичний',lat:48.9215,lng:24.7089},
];

export const JK_LIST = [
  {n:'Silver',dev:'Квартал',lat:48.94829,lng:24.68782,eo:true},
  {n:'Comfort Park',dev:'blago',lat:48.94320,lng:24.70661,eo:true},
  {n:'Family Plaza',dev:'blago',lat:48.93353,lng:24.71152,eo:true},
  {n:'Імперія II',dev:'Квартал',lat:48.93125,lng:24.71954,eo:true},
  {n:'Квартал №5',dev:'Квартал',lat:48.92546,lng:24.69517,eo:true},
  {n:'Manhattan UP',dev:'blago',lat:48.92119,lng:24.68617,eo:true},
  {n:'Manhattan',dev:'blago',lat:48.92021,lng:24.69019,eo:true},
  {n:'Skygarden',dev:'blago',lat:48.9182,lng:24.7295,eo:true},
  {n:'Паркова Алея',dev:'blago',lat:48.9145,lng:24.7482,eo:true},
  {n:'Millennium',dev:'МЖК Експрес',lat:48.91220,lng:24.67884,eo:true},
  {n:'TRIVIUM',dev:'VAMBUD',lat:48.91167,lng:24.69174,eo:true},
  {n:'Central Park',dev:'blago',lat:48.91075,lng:24.70176,eo:true},
  {n:'Паркове містечко',dev:'',lat:48.90901,lng:24.70421,eo:true},
];

export const NOVOBUD = [
  {n:'Silver',dev:'Квартал',lat:48.94829,lng:24.68782},
  {n:'Comfort Park',dev:'blago',lat:48.94320,lng:24.70661},
  {n:'Family Plaza',dev:'blago',lat:48.93353,lng:24.71152},
  {n:'Імперія II',dev:'Квартал',lat:48.93125,lng:24.71954},
  {n:'Квартал №5',dev:'Квартал',lat:48.92546,lng:24.69517},
  {n:'Manhattan UP',dev:'blago',lat:48.92119,lng:24.68617},
  {n:'Manhattan',dev:'blago',lat:48.92021,lng:24.69019},
  {n:'Паркова Алея',dev:'blago',lat:48.9145,lng:24.7482},
  {n:'Millennium',dev:'МЖК Експрес',lat:48.91220,lng:24.67884},
  {n:'Central Park',dev:'blago',lat:48.91075,lng:24.70176},
  {n:'Паркове містечко',dev:'',lat:48.90901,lng:24.70421},
  {n:'City',dev:'blago',lat:48.91003,lng:24.70593},
  {n:'SKYGARDEN',dev:'blago',lat:48.91481,lng:24.72897},
  {n:'Comfort House',dev:'blago',lat:48.94490,lng:24.71142},
  {n:'U One',dev:'blago',lat:48.93912,lng:24.73385},
  {n:'ЛИПКИ 2',dev:'Ярковиця',lat:48.90785,lng:24.68039},
  {n:'PARK AVENUE',dev:'Ярковиця',lat:48.90776,lng:24.69129},
  {n:'Lake Park',dev:'Ярковиця',lat:48.91295,lng:24.69525},
  {n:'Опришівська Слобода',dev:'Ярковиця',lat:48.88644,lng:24.71695},
  {n:'КАСКАД-ЯРКО',dev:'Ярковиця',lat:48.93856,lng:24.75097},
  {n:'ЯРКО Центр',dev:'Ярковиця',lat:48.92394,lng:24.70293},
  {n:'Акварелі',dev:'Ярковиця',lat:48.93942,lng:24.69467},
  {n:'Альпійський',dev:'Ярковиця',lat:48.94206,lng:24.69290},
  {n:'Гармонія',dev:'Socium',lat:48.94047,lng:24.70013},
  {n:'Містечко Південне',dev:'Socium',lat:48.89837,lng:24.71970},
  {n:'Княгинин Центр',dev:'Socium',lat:48.93925,lng:24.71140},
  {n:'Козацький',dev:'Socium',lat:48.90074,lng:24.68023},
  {n:'Senat',dev:'Socium',lat:48.92495,lng:24.73622},
  {n:'WAWEL',dev:'VAMBUD',lat:48.94544,lng:24.73486},
  {n:'TRIVIUM',dev:'VAMBUD',lat:48.91177,lng:24.69182},
  {n:'PORTO FRANKO',dev:'Vertical',lat:48.93731,lng:24.73488},
  {n:'HydroPark DeLuxe',dev:'Vertical',lat:48.91049,lng:24.68804},
  {n:'Lystopad',dev:'Vertical',lat:48.91666,lng:24.74039},
  {n:'Мануфактура',dev:'Vertical',lat:48.90378,lng:24.72070},
  {n:'Скандинавія',dev:'Франківський Дім',lat:48.90762,lng:24.71461},
  {n:'Княгинин район',dev:'Спілка забуд.',lat:48.93538,lng:24.70929},
  {n:'Атмосфера',dev:'Alliance',lat:48.92259,lng:24.69172},
  {n:'Liberty Gardens',dev:'BAUcomfort',lat:48.92808,lng:24.73292},
];

export const KEY_POI = [
  {n:'Ратуша (центр)',cat:'landmark',lat:48.9227,lng:24.7104},
  {n:'ЗВ Вокзал',cat:'transport',lat:48.9252,lng:24.7234},
  {n:'Автовокзал',cat:'transport',lat:48.9221,lng:24.7247},
  {n:'Veles Mall',cat:'mall',lat:48.9399,lng:24.7378},
  {n:'METRO',cat:'mall',lat:48.9439,lng:24.7424},
  {n:'Епіцентр',cat:'mall',lat:48.9307,lng:24.7445},
  {n:'ТРЦ Арсен',cat:'mall',lat:48.9329,lng:24.7460},
  {n:'Міське озеро',cat:'park',lat:48.9147,lng:24.6918},
  {n:'Парк Шевченка',cat:'park',lat:48.9109,lng:24.6991},
  {n:'ПНУ',cat:'uni',lat:48.9150,lng:24.7010},
  {n:'ІФНМУ',cat:'uni',lat:48.9215,lng:24.7089},
  {n:'ІФНТУНГ',cat:'uni',lat:48.9293,lng:24.6964},
];
