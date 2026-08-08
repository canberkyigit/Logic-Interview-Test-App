import generatedSets from "./generated-sets.json";
import { advancedVisualQuestions } from "./advanced-visual-data";
import { set1 } from "./set1-data";

export type VisualSpec = {
  type: string;
  items?: unknown[];
  rows?: unknown[];
};

export type Question = {
  id: number;
  kind: "sequence" | "logic" | "action" | "inference" | "number-matrix" | "visual" | "visual-odd";
  category: string;
  intro?: string | null;
  context?: string;
  statements?: string[];
  actions?: string[];
  fact?: string;
  sequence?: string;
  matrix?: Array<[number, number, string]>;
  prompt: string;
  options: string[];
  answer: number;
  explanation?: string;
  visual?: VisualSpec;
  visualOptions?: VisualSpec;
};

const set2: Question[] = [
  {
    id: 1,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "7 - 11 - 18 - 29 - 48 - 76 - 123",
    prompt: "Hangisi düzeni bozmaktadır?",
    options: ["11", "18", "29", "48", "76"],
    answer: 3,
  },
  {
    id: 2,
    kind: "logic",
    category: "Sözel mantık",
    intro: "Bir şirkette:",
    statements: [
      "Bütün uyum uzmanları şirket çalışanıdır.",
      "Çözülmemiş disiplin soruşturması bulunan hiçbir çalışan Seviye-4 verilere erişemez.",
      "Bazı uyum uzmanlarının Seviye-4 verilere erişim yetkisi vardır.",
    ],
    prompt: "Buna göre aşağıdakilerden hangisi kesinlikle doğrudur?",
    options: [
      "Bazı uyum uzmanlarının çözülmemiş disiplin soruşturması vardır.",
      "Seviye-4 veriye erişebilen hiçbir uyum uzmanının çözülmemiş disiplin soruşturması yoktur.",
      "Bütün şirket çalışanları uyum uzmanıdır.",
      "Uyum uzmanlarının tamamı Seviye-4 verilere erişebilir.",
      "Çözülmemiş disiplin soruşturması olmayan bütün çalışanlar Seviye-4 verilere erişebilir.",
    ],
    answer: 1,
  },
  {
    id: 3,
    kind: "action",
    category: "Açıklama + I / II",
    context: "Bir yazılım şirketi yeni önbellekleme altyapısını saat 14.00'te devreye almıştır. Saat 14.00-16.00 arasında uygulamanın çökme oranı %0,8'den %4,6'ya yükselmiştir. Aynı zaman diliminde sunucu kapasitesinde veya trafik hacminde belirgin bir değişiklik görülmemiştir.",
    actions: [
      "Yeni altyapının telemetri kayıtları eski sürümle karşılaştırılmalı ve gerekirse kontrollü geri alma işlemi değerlendirilmelidir.",
      "Sorunun çalışan bilgisayarlarından kaynaklandığı kabul edilerek tüm çalışanların bilgisayarları değiştirilmelidir.",
    ],
    prompt: "Hangisi mantıklı bir eylemdir?",
    options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"],
    answer: 0,
  },
  {
    id: 4,
    kind: "visual",
    category: "Şekil matrisi",
    intro: "Ok yönü ve dolu/boş daire satırlarla sütunlarda düzenli ilerlemektedir.",
    prompt: "Hangisi gelmelidir?",
    options: ["A", "B", "C", "D", "E"],
    answer: 0,
    visual: {
      type: "LegacyArrowMatrix",
      rows: [
        [["up", false], ["right", true], ["down", false]],
        [["right", true], ["down", false], ["left", true]],
        [["down", false], ["left", true], null],
      ],
    },
    visualOptions: {
      type: "ArrowOptions",
      items: [["up", false], ["up", true], ["right", false], ["left", false], ["down", true]],
    },
  },
  {
    id: 5,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "5 - 7 - 13 - 25 - 45 - 74 - 117",
    prompt: "Hangisi düzeni bozmaktadır?",
    options: ["13", "25", "45", "74", "117"],
    answer: 3,
  },
  {
    id: 6,
    kind: "logic",
    category: "Sıralama mantığı",
    intro: "Altı aday K, L, M, N, O ve P bir mülakata farklı saatlerde girmiştir.",
    statements: [
      "N, L'nin hemen öncesinde mülakata girmiştir.",
      "L, K'den önce girmiştir.",
      "K, M'den önce girmiştir.",
      "O, M'den sonra girmiştir.",
      "P, N'den önce girmiştir.",
    ],
    prompt: "Aşağıdakilerden hangisi kesinlikle doğrudur?",
    options: [
      "P, M'den önce girmiştir.",
      "K üçüncü sıradadır.",
      "O son sıradadır.",
      "L ikinci sıradadır.",
      "M, N'den hemen sonra girmiştir.",
    ],
    answer: 0,
  },
  {
    id: 7,
    kind: "logic",
    category: "Sözel mantık",
    statements: [
      "Bazı mimarlar araştırmacıdır.",
      "Her araştırmacı İngilizce bilmektedir.",
      "İngilizce bilen hiç kimse X grubuna üye değildir.",
    ],
    prompt: "Buna göre hangisi kesinlikle doğrudur?",
    options: [
      "Bütün mimarlar İngilizce bilir.",
      "Bazı mimarlar X grubunun üyesi değildir.",
      "X grubundaki hiç kimse mimar değildir.",
      "Araştırmacı olmayan hiçbir mimar İngilizce bilmez.",
      "X grubunda araştırmacılar bulunabilir.",
    ],
    answer: 1,
  },
  {
    id: 8,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "4 - 9 - 17 - 35 - 70 - 139 - 277",
    prompt: "Hangisi yanlıştır?",
    options: ["17", "35", "70", "139", "277"],
    answer: 2,
  },
  {
    id: 9,
    kind: "action",
    category: "Açıklama + I / II",
    context: "Bir üretim şirketinde son iki ayda işe gelmeme oranı yükselmiştir. Artış özellikle üç vardiyadan birinde yoğunlaşmıştır. Henüz çalışanlarla görüşme yapılmamıştır.",
    actions: [
      "İlgili vardiyadaki çalışma koşulları, yönetici uygulamaları ve çalışanların devamsızlık nedenleri araştırılmalıdır.",
      "Devamsızlık yaptığı belirlenen bütün çalışanların yıllık izin hakları süresiz olarak kaldırılmalıdır.",
    ],
    prompt: "Hangisi mantıklı bir eylemdir?",
    options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"],
    answer: 0,
  },
  {
    id: 10,
    kind: "number-matrix",
    category: "Sayı matrisi",
    matrix: [[4, 5, "24"], [6, 3, "20"], [8, 4, "?"]],
    prompt: "? kaçtır?",
    options: ["31", "32", "34", "35", "36"],
    answer: 3,
  },
  {
    id: 11,
    kind: "logic",
    category: "Sözel mantık",
    intro: "Bir teknoloji şirketinde:",
    statements: [
      "Bütün stajyerler en az bir yöneticiye rapor verir.",
      "Bazı stajyerler veri analistidir.",
      "Hiçbir yönetici stajyer değildir.",
    ],
    prompt: "Buna göre aşağıdakilerden hangisi kesinlikle doğrudur?",
    options: [
      "Bütün veri analistleri stajyerdir.",
      "Bazı veri analistleri bir yöneticiye rapor verir.",
      "Bazı yöneticiler veri analistidir.",
      "Hiçbir veri analisti yönetici değildir.",
      "Stajyer olmayan herkes yöneticidir.",
    ],
    answer: 1,
  },
  {
    id: 12,
    kind: "visual-odd",
    category: "Uyumsuz şekil",
    intro: "Dört şekilde kenar sayısı ile içindeki nokta sayısı arasında aynı ilişki vardır.",
    prompt: "Hangisi diğerlerinden farklıdır?",
    options: ["A", "B", "C", "D", "E"],
    answer: 4,
    visualOptions: {
      type: "PolygonDotOdd",
      items: [[3, 1], [4, 2], [5, 3], [6, 4], [8, 5]],
    },
  },
  {
    id: 13,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "3 - 5 - 12 - 15 - 48 - 45 - 190 - 135",
    prompt: "Hangisi düzeni bozmaktadır?",
    options: ["12", "15", "48", "190", "135"],
    answer: 3,
  },
  {
    id: 14,
    kind: "inference",
    category: "Çıkarım",
    intro: "Bir şirket prosedüründe:",
    statements: [
      "Müşteri verisi içeren hiçbir proje hem Hukuk hem Bilgi Güvenliği onayı olmadan canlıya geçirilemez.",
      "Müşteri verisi içermeyen bazı iç projelerde bu iki onay zorunlu değildir.",
    ],
    fact: "Atlas Projesi canlıya geçirilmiştir ve müşteri verisi içerdiği bilinmektedir.",
    prompt: "Buna göre hangisi kesinlikle doğrudur?",
    options: [
      "Atlas yalnızca Hukuk biriminden onay almıştır.",
      "Atlas yalnızca Bilgi Güvenliği biriminden onay almıştır.",
      "Atlas hem Hukuk hem Bilgi Güvenliği onayı almıştır.",
      "Atlas'ın müşteri verisi içermediği anlaşılır.",
      "Atlas'ın onay alıp almadığı belirlenemez.",
    ],
    answer: 2,
  },
  {
    id: 15,
    kind: "action",
    category: "Açıklama + I / II",
    context: "Bir gıda üreticisinin aynı üretim partisinden alınan iki bağımsız numunede zararlı bakteri tespit edilmiştir. Partinin bir kısmı marketlere sevk edilmiştir.",
    actions: [
      "İlgili parti satıştan çekilmeli veya karantinaya alınmalı ve kontaminasyon kaynağı araştırılmalıdır.",
      "Şirketin ülkedeki bütün fabrikaları kalıcı olarak kapatılmalıdır.",
    ],
    prompt: "Hangisi mantıklı bir eylemdir?",
    options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"],
    answer: 0,
  },
  {
    id: 16,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "2 - 9 - 28 - 65 - 126 - 216 - 344",
    prompt: "Hangisi örüntüyü bozmaktadır?",
    options: ["28", "65", "126", "216", "344"],
    answer: 3,
  },
  {
    id: 17,
    kind: "logic",
    category: "Sözel mantık",
    statements: [
      "Hiçbir elektrikli otomobil dizel yakıt kullanmaz.",
      "Bazı şirket araçları elektrikli otomobildir.",
      "Bütün şirket araçları sigortalıdır.",
    ],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: [
      "Bütün sigortalı araçlar elektriklidir.",
      "Bazı sigortalı araçlar dizel yakıt kullanmaz.",
      "Hiçbir şirket aracı dizel değildir.",
      "Elektrikli olmayan bütün şirket araçları dizeldir.",
      "Bazı dizel araçlar sigortalı değildir.",
    ],
    answer: 1,
  },
  {
    id: 18,
    kind: "logic",
    category: "Yerleştirme / sıralama",
    intro: "A, B, C, D, E, F ve G adlı yedi kitap bir rafa soldan sağa dizilecektir.",
    statements: [
      "C, D'nin solundadır.",
      "A, B'nin hemen solundadır.",
      "F, D'nin sağındadır.",
      "G, A'nın solundadır.",
      "E en sağdadır.",
    ],
    prompt: "Buna göre hangisi kesinlikle doğrudur?",
    options: [
      "G, B'nin solundadır.",
      "A üçüncü sıradadır.",
      "D, B'nin sağındadır.",
      "C en soldadır.",
      "F, A'nın hemen sağındadır.",
    ],
    answer: 0,
  },
  {
    id: 19,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "10 - 13 - 21 - 36 - 60 - 94 - 143",
    prompt: "Hangisi yanlıştır?",
    options: ["21", "36", "60", "94", "143"],
    answer: 3,
  },
  {
    id: 20,
    kind: "visual",
    category: "Şekil matrisi",
    intro: "Şekil sayıları 1-2-3 olarak döngüsel ilerlemekte, dolu/boş durumu dönüşümlü değişmektedir.",
    prompt: "Hangisi gelmelidir?",
    options: ["A", "B", "C", "D", "E"],
    answer: 1,
    visual: {
      type: "DotCountMatrix",
      rows: [
        [[1, true], [2, false], [3, true]],
        [[2, false], [3, true], [1, false]],
        [[3, true], [1, false], null],
      ],
    },
    visualOptions: {
      type: "DotOptions",
      items: [[1, true], [2, false], [2, true], [3, false], [3, true]],
    },
  },
  {
    id: 21,
    kind: "action",
    category: "Açıklama + I / II",
    context: "Bir depoda aynı koridorda üç kez çarpışma tehlikesi yaşanmıştır. Aydınlatma standartların altındadır ve yüksek paletler görüşü kısıtlamaktadır.",
    actions: [
      "Koridorun aydınlatması gerekli standarda yükseltilmelidir.",
      "Paletlerin yerleşimi görüş hattını engellemeyecek şekilde yeniden düzenlenmelidir.",
    ],
    prompt: "Hangisi mantıklı bir eylemdir?",
    options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"],
    answer: 2,
  },
  {
    id: 22,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "2 - 6 - 15 - 31 - 56 - 91 - 141",
    prompt: "Hangisi düzeni bozmaktadır?",
    options: ["15", "31", "56", "91", "141"],
    answer: 3,
  },
  {
    id: 23,
    kind: "logic",
    category: "Sözel mantık",
    statements: [
      "Bütün kırmızı kutular mühürlüdür.",
      "Bazı mühürlü kutular ağırdır.",
      "Hiçbir ağır kutu şeffaf değildir.",
    ],
    prompt: "Hangisi kesinlikle doğrudur?",
    options: [
      "Bazı kırmızı kutular ağırdır.",
      "Bütün mühürlü kutular kırmızıdır.",
      "Bazı mühürlü kutular şeffaf değildir.",
      "Hiçbir kırmızı kutu şeffaf değildir.",
      "Bütün ağır kutular kırmızıdır.",
    ],
    answer: 2,
  },
  {
    id: 24,
    kind: "inference",
    category: "Çıkarım",
    intro: "Bir lojistik firmasında:",
    statements: [
      "Her uluslararası gönderi gümrük kontrolünden geçer.",
      "Lityum pil içeren her gönderi tehlikeli madde incelemesine girer.",
      "İncelemelerin sırası rotaya göre değişebilir.",
    ],
    fact: "K gönderisinin uluslararası olduğu ve lityum pil içerdiği bilinmektedir.",
    prompt: "Hangisi kesinlikle doğrudur?",
    options: [
      "K yalnızca gümrük kontrolünden geçer.",
      "K yalnızca tehlikeli madde incelemesinden geçer.",
      "K her iki incelemeden de geçer.",
      "Gümrük incelemesi mutlaka önce yapılır.",
      "Tehlikeli madde incelemesi mutlaka önce yapılır.",
    ],
    answer: 2,
  },
  {
    id: 25,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "6 - 8 - 24 - 28 - 112 - 118 - 590 - 597",
    prompt: "Hangisi düzeni bozmaktadır?",
    options: ["28", "112", "118", "590", "597"],
    answer: 4,
  },
  {
    id: 26,
    kind: "action",
    category: "Açıklama + I / II",
    context: "Bir bankada yüz yüze işlem sayısı %18 azalırken aynı müşterilerin mobil ve internet işlemleri artmıştır. Şube hizmet kalitesinde belirgin bozulma yoktur.",
    actions: [
      "Tüm şubeler derhal ve kalıcı olarak kapatılmalıdır.",
      "İnternet ve mobil bankacılık durdurularak müşteriler şubelere yönlendirilmelidir.",
    ],
    prompt: "Hangisi mantıklı bir eylemdir?",
    options: ["Yalnız I", "Yalnız II", "I ve II", "Ne I ne II"],
    answer: 3,
  },
  {
    id: 27,
    kind: "visual",
    category: "Görsel örüntü",
    intro: "Ok yönü saat yönünde, iki dairenin sıralaması ise dönüşümlü değişmektedir.",
    prompt: "Hangisi gelmelidir?",
    options: ["A", "B", "C", "D", "E"],
    answer: 0,
    visual: {
      type: "ArrowDotSequence",
      items: [["up", [true, false]], ["right", [false, true]], ["down", [true, false]], ["left", [false, true]], null],
    },
    visualOptions: {
      type: "ArrowDotOptions",
      items: [["up", [true, false]], ["up", [false, true]], ["right", [true, false]], ["down", [false, true]], ["left", [true, false]]],
    },
  },
  {
    id: 28,
    kind: "sequence",
    category: "Sayısal örüntü - düzeni bozan sayı",
    sequence: "18 - 21 - 42 - 46 - 138 - 143 - 570",
    prompt: "Hangisi düzeni bozmaktadır?",
    options: ["21", "42", "46", "143", "570"],
    answer: 4,
  },
  {
    id: 29,
    kind: "logic",
    category: "Sözel mantık",
    statements: [
      "Bazı danışmanlar avukattır.",
      "Hiçbir avukat kadrolu çalışan değildir.",
      "Her kadrolu çalışan yıllık performans primi almaktadır.",
    ],
    prompt: "Buna göre aşağıdakilerden hangisi kesinlikle doğrudur?",
    options: [
      "Bazı danışmanlar kadrolu çalışan değildir.",
      "Hiçbir danışman kadrolu çalışan değildir.",
      "Bütün danışmanlar avukattır.",
      "Prim alan hiç kimse avukat değildir.",
      "Bazı avukatlar performans primi almaktadır.",
    ],
    answer: 0,
  },
  {
    id: 30,
    kind: "logic",
    category: "Karma sıralama",
    intro: "Yedi proje P, Q, R, S, T, U ve V aynı gün farklı zamanlarda tamamlanmıştır.",
    statements: [
      "U, P'den önce tamamlanmıştır.",
      "P, Q'dan önce tamamlanmıştır.",
      "Q, T'den önce tamamlanmıştır.",
      "T, S'den önce tamamlanmıştır.",
      "R, S'nin hemen ardından tamamlanmıştır.",
      "V, Q'dan sonra tamamlanmıştır.",
    ],
    prompt: "Buna göre hangisi kesinlikle doğrudur?",
    options: [
      "V, S'den önce tamamlanmıştır.",
      "U, R'den önce tamamlanmıştır.",
      "P ikinci sıradadır.",
      "T, V'den önce tamamlanmıştır.",
      "S altıncı sıradadır.",
    ],
    answer: 1,
  },
];

export type SetNumber = 1 | 2 | 3 | 4 | 5;

function withAdvancedVisuals(setNumber: SetNumber, questions: Question[]): Question[] {
  const replacements = new Map(
    advancedVisualQuestions[setNumber].map((question) => [question.id, question]),
  );

  return questions.map((question) => replacements.get(question.id) ?? question);
}

export const questionSets: Record<SetNumber, Question[]> = {
  1: withAdvancedVisuals(1, set1),
  2: withAdvancedVisuals(2, set2),
  3: withAdvancedVisuals(3, generatedSets["3"] as Question[]),
  4: withAdvancedVisuals(4, generatedSets["4"] as Question[]),
  5: withAdvancedVisuals(5, generatedSets["5"] as Question[]),
};

export const setMeta: Record<SetNumber, { level: string; note: string; accent: string }> = {
  1: { level: "Başlangıç / Orta", note: "Temel kalıpları hızlandır", accent: "#5d758c" },
  2: { level: "Orta / Zor", note: "Temel ritmi kur", accent: "#138a8a" },
  3: { level: "Orta / Zor+", note: "Çift kuralları yakala", accent: "#2474a8" },
  4: { level: "Zor", note: "Dikkat tuzaklarına gir", accent: "#8a5a20" },
  5: { level: "İleri", note: "Sınırlarını test et", accent: "#8b3f5e" },
};
