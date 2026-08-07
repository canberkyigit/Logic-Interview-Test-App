import type { Question } from "./question-data";

export const set1: Question[] = [
  { id: 1, kind: "sequence", category: "Sayı dizisi", sequence: "3 - 7 - 15 - 31 - 63 - ?", prompt: "Sıradaki sayı hangisidir?", options: ["95", "111", "127", "129", "131"], answer: 2, explanation: "Her terim önceki sayının iki katının bir fazlasıdır: 63 × 2 + 1 = 127." },
  { id: 2, kind: "sequence", category: "Sayı dizisi", sequence: "2 - 5 - 11 - 23 - 47 - ?", prompt: "Sıradaki sayı hangisidir?", options: ["91", "93", "94", "95", "96"], answer: 3, explanation: "Her terim önceki sayının iki katının bir fazlasıdır: 47 × 2 + 1 = 95." },
  { id: 3, kind: "sequence", category: "Sayı dizisi", sequence: "90 - 45 - 47 - 23,5 - 25,5 - ?", prompt: "Sıradaki sayı hangisidir?", options: ["11,25", "12,25", "12,75", "13,25", "14,25"], answer: 2, explanation: "İşlemler sırayla ikiye bölme ve 2 ekleme biçimindedir: 25,5 ÷ 2 = 12,75." },
  { id: 4, kind: "sequence", category: "Sayı dizisi", sequence: "4 - 6 - 12 - 14 - 28 - 30 - ?", prompt: "Sıradaki sayı hangisidir?", options: ["32", "56", "58", "60", "62"], answer: 3, explanation: "İşlemler +2 ve ×2 olarak dönüşümlü ilerler: 30 × 2 = 60." },
  { id: 5, kind: "sequence", category: "Sayı dizisi", sequence: "1 - 2 - 6 - 15 - 31 - 56 - ?", prompt: "Sıradaki sayı hangisidir?", options: ["82", "87", "92", "94", "98"], answer: 2, explanation: "Artışlar 1, 4, 9, 16, 25 ve 36 şeklinde kare sayılardır: 56 + 36 = 92." },
  { id: 6, kind: "sequence", category: "Diziyi bozan sayı", sequence: "7 - 14 - 28 - 56 - 110 - 224", prompt: "Hangisi düzeni bozmaktadır?", options: ["14", "28", "56", "110", "224"], answer: 3, explanation: "Her sayı iki katına çıkmalıdır. 56'dan sonra 112 gelmesi gerekir; bu nedenle 110 düzeni bozar." },
  { id: 7, kind: "sequence", category: "Diziyi bozan sayı", sequence: "1 - 4 - 9 - 16 - 24 - 36", prompt: "Hangisi düzeni bozmaktadır?", options: ["4", "9", "16", "24", "36"], answer: 3, explanation: "Dizi ardışık sayıların karelerinden oluşur. 16'dan sonra 25 gelmelidir; 24 yanlıştır." },
  { id: 8, kind: "sequence", category: "Diziyi bozan sayı", sequence: "5 - 11 - 23 - 47 - 96 - 191", prompt: "Hangisi düzeni bozmaktadır?", options: ["11", "23", "47", "96", "191"], answer: 3, explanation: "Kural ×2 + 1'dir. 47'den sonra 95 gelmesi gerekir; 96 düzeni bozar." },
  { id: 9, kind: "sequence", category: "Diziyi bozan sayı", sequence: "13 - 17 - 19 - 23 - 27 - 29", prompt: "Hangisi düzeni bozmaktadır?", options: ["17", "19", "23", "27", "29"], answer: 3, explanation: "Dizideki sayılar asal olmalıdır. 27 asal olmadığı için diğerlerinden farklıdır." },
  { id: 10, kind: "sequence", category: "Diziyi bozan sayı", sequence: "2 - 6 - 12 - 20 - 30 - 43", prompt: "Hangisi düzeni bozmaktadır?", options: ["6", "12", "20", "30", "43"], answer: 4, explanation: "Terimler n × (n + 1) biçimindedir: 1×2, 2×3, …, 6×7 = 42. Bu nedenle 43 yanlıştır." },
  {
    id: 11, kind: "logic", category: "Sözel mantık",
    statements: ["Bazı mühendisler yöneticidir.", "Bütün yöneticiler üniversite mezunudur."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Bütün mühendisler üniversite mezunudur.", "Bazı mühendisler üniversite mezunudur.", "Bütün mezunlar yöneticidir.", "Bazı mezunlar mühendis değildir.", "Hiçbir mühendis yönetici değildir."], answer: 1,
  },
  {
    id: 12, kind: "logic", category: "Sözel mantık",
    statements: ["Bütün kamyonlar ağır araçtır.", "Hiçbir ağır araç bisiklet değildir."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Bazı kamyonlar bisiklettir.", "Hiçbir kamyon bisiklet değildir.", "Bütün bisikletler kamyondur.", "Bazı ağır araçlar kamyon değildir.", "Bütün ağır araçlar kamyondur."], answer: 1,
  },
  {
    id: 13, kind: "logic", category: "Sözel mantık",
    statements: ["Bazı kitaplar roman değildir.", "Bütün romanlar kurmacadır."],
    prompt: "Hangisi kesin olarak çıkar?",
    options: ["Bazı kitaplar kurmaca değildir.", "Bütün kitaplar kurmacadır.", "Bazı kurmacalar kitaptır.", "Hiçbiri kesin çıkarılamaz.", "Roman olmayan hiçbir kitap kurmaca değildir."], answer: 3,
  },
  {
    id: 14, kind: "logic", category: "Sözel mantık",
    statements: ["Hiçbir doktor dikkatsiz değildir.", "Bazı cerrahlar doktordur."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Bütün cerrahlar dikkatlidir.", "Bazı cerrahlar dikkatsiz değildir.", "Hiçbir cerrah doktor değildir.", "Bazı doktorlar cerrah değildir.", "Bütün doktorlar cerrahtır."], answer: 1,
  },
  {
    id: 15, kind: "logic", category: "Sözel mantık",
    statements: ["Bütün A'lar B'dir.", "Bazı B'ler C'dir.", "Hiçbir C, D değildir."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Bazı A'lar C'dir.", "Hiçbir A, D değildir.", "Bazı B'ler D değildir.", "Bütün B'ler A'dır.", "Bazı D'ler B'dir."], answer: 2,
  },
  {
    id: 16, kind: "inference", category: "Çıkarım",
    statements: ["Bir şirkette uzaktan çalışan herkes VPN kullanmaktadır.", "Bazı yazılımcılar uzaktan çalışmaktadır."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Bütün yazılımcılar VPN kullanır.", "Bazı yazılımcılar VPN kullanır.", "VPN kullanan herkes yazılımcıdır.", "Bazı VPN kullanıcıları uzaktan çalışmaz.", "Hiçbir yazılımcı ofiste çalışmaz."], answer: 1,
  },
  {
    id: 17, kind: "inference", category: "Çıkarım",
    statements: ["Matematik kulübündeki her öğrenci satranç kulübündedir.", "Satranç kulübündeki bazı öğrenciler müzik kulübündedir."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Matematik kulübündeki herkes müzik kulübündedir.", "Müzik kulübündeki herkes satranç kulübündedir.", "Bazı satranç kulübü öğrencileri müzik kulübündedir.", "Matematik kulübü ile müzik kulübü kesin kesişir.", "Hiçbiri."], answer: 2,
  },
  {
    id: 18, kind: "inference", category: "Sıralama çıkarımı",
    statements: ["Ayşe, Burak'tan önce geldi.", "Cem, Ayşe'den sonra fakat Deniz'den önce geldi."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Burak, Cem'den önce geldi.", "Deniz, Ayşe'den önce geldi.", "Ayşe, Deniz'den önce geldi.", "Cem ilk geldi.", "Burak son geldi."], answer: 2,
  },
  {
    id: 19, kind: "inference", category: "Yerleştirme çıkarımı", intro: "Beş kişi soldan sağa diziliyor.",
    statements: ["Ece, Mert'in solundadır.", "Mert, Ali'nin solundadır.", "Can en sağdadır."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Ece, Ali'nin solundadır.", "Ali, Can'ın sağındadır.", "Mert en soldadır.", "Ece ikinci sıradadır.", "Ali en sağdadır."], answer: 0,
  },
  {
    id: 20, kind: "inference", category: "Çıkarım",
    statements: ["Bir mağazada indirimde olan tüm ürünlerin etiketi kırmızıdır.", "Bazı kırmızı etiketli ürünler elektronik değildir."],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: ["Bazı indirimli ürünler elektronik değildir.", "Kırmızı etiketli tüm ürünler indirimlidir.", "Elektronik olmayan bazı ürünlerin etiketi kırmızıdır.", "Hiçbir elektronik ürün indirimli değildir.", "Bütün kırmızı ürünler elektroniktir."], answer: 2,
  },
  {
    id: 21, kind: "action", category: "Açıklama + I / II", context: "Bir fabrikanın son üç aydaki üretim hataları belirgin şekilde artmıştır.",
    actions: ["Üretim süreci ve kalite kontrol adımları incelenmelidir.", "Fabrikadaki bütün çalışanlar değiştirilmelidir."], prompt: "Hangisi mantıklı bir eylemdir?", options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"], answer: 0,
  },
  {
    id: 22, kind: "action", category: "Açıklama + I / II", context: "Bir bankanın mobil uygulamasında son güncellemeden sonra kullanıcı şikayetleri artmıştır.",
    actions: ["Son güncellemedeki değişiklikler teknik olarak incelenmelidir.", "Mobil uygulama kalıcı olarak kapatılmalıdır."], prompt: "Hangisi mantıklı bir eylemdir?", options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"], answer: 0,
  },
  {
    id: 23, kind: "action", category: "Açıklama + I / II", context: "Bir ilçede son dönemde trafik kazalarının çoğu aynı kavşakta gerçekleşmiştir.",
    actions: ["Kavşağın sinyalizasyonu ve yol düzeni incelenmelidir.", "İlçedeki bütün yollar trafiğe kapatılmalıdır."], prompt: "Hangisi mantıklı bir eylemdir?", options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"], answer: 0,
  },
  {
    id: 24, kind: "action", category: "Açıklama + I / II", context: "Bir şirketin çalışanlarının önemli bir kısmı son ankette iş yükünden şikayet etmiştir.",
    actions: ["İş dağılımı ve ekip kapasitesi gözden geçirilmelidir.", "Şikayet eden bütün çalışanlara disiplin cezası verilmelidir."], prompt: "Hangisi mantıklı bir eylemdir?", options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"], answer: 0,
  },
  {
    id: 25, kind: "action", category: "Açıklama + I / II", context: "Bir şehirde su tüketimi yaz aylarında mevcut rezervleri zorlayacak düzeye çıkmıştır.",
    actions: ["Su tasarrufu konusunda bilgilendirme yapılmalıdır.", "Gereksiz tüketimi azaltmaya yönelik önlemler değerlendirilmelidir."], prompt: "Hangisi mantıklı bir eylemdir?", options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"], answer: 2,
  },
  {
    id: 26, kind: "visual", category: "Şekil mantığı", intro: "Ok her adımda saat yönünde 90 derece dönmektedir.", prompt: "Hangisi gelmelidir?", options: ["A", "B", "C", "D"], answer: 0,
    visual: { type: "ArrowOnlySequence", items: [["up"], ["right"], ["down"], ["left"], null] }, visualOptions: { type: "ArrowOnlyOptions", items: [["up"], ["right"], ["down"], ["left"]] },
  },
  {
    id: 27, kind: "visual-odd", category: "Uyumsuz şekil", prompt: "Hangisi diğerlerinden farklıdır?", options: ["A", "B", "C", "D", "E"], answer: 3, explanation: "Dört şeklin köşeleri vardır; daire köşesiz olduğu için diğerlerinden farklıdır.",
    visualOptions: { type: "IconOptions", items: [["triangle", false], ["square", false], ["diamond", false], ["circle", false], ["triangle-down", false]] },
  },
  {
    id: 28, kind: "visual", category: "Şekil mantığı", intro: "Dolu nokta her adımda bir konum sağa ilerlemektedir.", prompt: "Hangisi gelmelidir?", options: ["A", "B", "C", "D", "E"], answer: 0,
    visual: { type: "DotPositionSequence", items: [[true, false, false], [false, true, false], [false, false, true], null] }, visualOptions: { type: "DotPositionOptions", items: [[true, false, false], [false, true, false], [false, false, true], [true, true, false], [false, true, true]] },
  },
  {
    id: 29, kind: "visual-odd", category: "Dönüşüm mantığı", prompt: "Hangisi diğerlerinden farklı bir dönüşüm mantığına sahiptir?", options: ["A", "B", "C", "D", "E"], answer: 4, explanation: "İlk dört seçenekte ok 90 derece saat yönünde döner. Son seçenekte dönüş 180 derece olduğu için kuralı bozar.",
    visualOptions: { type: "ArrowPairOptions", items: [["up", "right"], ["right", "down"], ["down", "left"], ["left", "up"], ["up", "down"]] },
  },
  {
    id: 30, kind: "visual", category: "Şekil örüntüsü", intro: "Dolu ve boş kareler satırlarda dama tahtası düzeninde değişmektedir.", prompt: "Hangisi gelmelidir?", options: ["A", "B", "C", "D", "E"], answer: 1,
    visual: { type: "CheckerRowSequence", items: [[true, false, true, false], [false, true, false, true], [true, false, true, false], null] }, visualOptions: { type: "CheckerRowOptions", items: [[true, false, true, false], [false, true, false, true], [true, true, false, false], [false, false, true, true], [true, true, true, true]] },
  },
];
