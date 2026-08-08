import type { Question } from "./question-data";

type Shape = [string, boolean, number, number, number, number?];
type Line = [number, number?, number?, number?, number?];
type Dot = [number, number, boolean?, number?];
type Tile = { shapes?: Shape[]; lines?: Line[]; dots?: Dot[]; connector?: boolean };

const POS = {
  tl: [18, 18], t: [50, 13], tr: [82, 18],
  l: [13, 50], c: [50, 50], r: [87, 50],
  bl: [18, 82], b: [50, 87], br: [82, 82],
} as const;

type Position = keyof typeof POS;

const shape = (kind: string, filled: boolean, x = 50, y = 50, size = 42, rotation = 0): Shape => [kind, filled, x, y, size, rotation];
const line = (angle: number, x = 50, y = 50, length = 62, thickness = 2): Line => [angle, x, y, length, thickness];
const dot = (position: Position, filled = true, size = 8): Dot => [POS[position][0], POS[position][1], filled, size];
const tile = (shapes: Shape[] = [], lines: Line[] = [], dots: Dot[] = [], connector = false): Tile => ({ shapes, lines, dots, connector });

const single = (kind: string, filled: boolean, dotPosition?: Position, rotation = 0): Tile =>
  tile([shape(kind, filled, 50, 50, 43, rotation)], [], dotPosition ? [dot(dotPosition)] : []);

const nested = (outer: string, outerFilled: boolean, inner: string, innerFilled: boolean, dotPosition?: Position, outerRotation = 0, innerRotation = 0): Tile =>
  tile([shape(outer, outerFilled, 50, 50, 68, outerRotation), shape(inner, innerFilled, 50, 50, 31, innerRotation)], [], dotPosition ? [dot(dotPosition)] : []);

const lineTile = (angles: number[], dotPositions: Position[] = [], openDots: Position[] = []): Tile =>
  tile([], angles.map((angle) => line(angle)), [...dotPositions.map((position) => dot(position)), ...openDots.map((position) => dot(position, false))]);

const polygonLine = (kind: string, filled: boolean, angle: number, dotPosition: Position): Tile =>
  tile([shape(kind, filled, 50, 50, 66)], [line(angle, 50, 50, 38)], [dot(dotPosition)]);

const countTile = (kind: string, count: number, filled: boolean): Tile => {
  const positions = count === 1 ? [[50, 50]] : count === 2 ? [[34, 50], [66, 50]] : [[24, 50], [50, 50], [76, 50]];
  return tile(positions.map(([x, y]) => shape(kind, filled, x, y, 20)));
};

const shapeDots = (kind: string, filled: boolean, positions: Position[]): Tile =>
  tile([shape(kind, filled, 50, 50, 60)], [], positions.map((position) => dot(position)));

const matrix = (rows: Array<Array<Tile | null>>) => ({ type: "AdvancedMatrix", rows });
const sequence = (items: Array<Tile | null>) => ({ type: "AdvancedSequence", items });
const options = (items: Tile[]) => ({ type: "AdvancedOptions", items });
const oddOptions = (items: Tile[]) => ({ type: "AdvancedOddOptions", items });

const set1: Question[] = [
  {
    id: 26, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücreyi tamamlayan seçenek hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 3,
    visual: matrix([
      [single("triangle", false, "t"), single("square", true, "r"), single("circle", false, "b")],
      [single("square", true, "r"), single("circle", false, "b"), single("triangle", true, "t")],
      [single("circle", false, "b"), single("triangle", true, "t"), null],
    ]),
    visualOptions: options([single("square", true, "r"), single("circle", false, "r"), single("square", false, "b"), single("square", false, "r"), single("triangle", false, "r")]),
    explanation: "Şekiller üçgen-kare-daire olarak kayar; doluluk dama düzenindedir; nokta üst-sağ-alt döngüsünü izler. Eksik hücre boş kare ve sağ noktadır.",
  },
  {
    id: 27, kind: "visual-odd", category: "Uyumsuz şekil",
    prompt: "Kuralı bozan seçenek hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 3,
    visualOptions: oddOptions([
      nested("square", false, "triangle", true), nested("pentagon", false, "square", true), nested("hexagon", false, "pentagon", true), nested("hexagon", false, "square", true), nested("octagon", false, "heptagon", true),
    ]),
    explanation: "A, B, C ve E'de iç şekil dış şekilden bir kenar eksiktir. D'de fark iki kenardır.",
  },
  {
    id: 28, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 0,
    visual: matrix([
      [lineTile([90]), lineTile([0]), lineTile([90, 0])],
      [lineTile([45]), lineTile([-45]), lineTile([45, -45])],
      [lineTile([90, 45]), lineTile([0, -45]), null],
    ]),
    visualOptions: options([lineTile([90, 0, 45, -45]), lineTile([90, 0]), lineTile([45, -45]), lineTile([0, 45, -45]), lineTile([90, 45, -45])]),
    explanation: "Son satırda dikey ve sağ çapraz çizgi; yatay ve sol çapraz çizgiyle birleşir. Sonuç dört çizginin tamamıdır.",
  },
  {
    id: 29, kind: "visual", category: "Görsel örüntü",
    prompt: "Sıradaki şekil hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 2,
    visual: sequence([single("triangle", false, "tl", 0), single("square", true, "tr", 45), single("triangle", false, "br", 180), single("square", true, "bl", 225), null]),
    visualOptions: options([single("triangle", true, "tl", 0), single("square", false, "tl", 0), single("triangle", false, "tl", 0), single("triangle", false, "tr", 0), single("triangle", false, "tl", 90)]),
    explanation: "Beşinci adımda şekil yeniden boş üçgene, dönüş 360 dereceyle başlangıç yönüne ve nokta sol üste döner.",
  },
  {
    id: 30, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 1,
    visual: matrix([
      [lineTile([0, 45], ["tl"]), lineTile([45, 90], ["tr"]), lineTile([90, 135], ["br"])],
      [lineTile([0, 45], ["tr"]), lineTile([45, 90], ["br"]), lineTile([90, 135], ["bl"])],
      [lineTile([0, 45], ["br"]), lineTile([45, 90], ["bl"]), null],
    ]),
    visualOptions: options([lineTile([45, 90], ["tl"]), lineTile([90, 135], ["tl"]), lineTile([90, 135], ["tr"]), lineTile([0, 45], ["tl"]), lineTile([90, 135], ["bl"])]),
    explanation: "Üçüncü sütunda çizgiler 90 ve 135 derecedir. Üçüncü satırın nokta dizisi sağ alt-sol alt-sol üst biçiminde tamamlanır.",
  },
];

const set2: Question[] = [
  {
    id: 4, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 4,
    visual: matrix([
      [nested("triangle", false, "circle", true), nested("square", true, "triangle", false), nested("pentagon", false, "square", true)],
      [nested("square", true, "square", false), nested("pentagon", false, "circle", true), nested("triangle", true, "triangle", false)],
      [nested("pentagon", false, "triangle", true), nested("triangle", true, "square", false), null],
    ]),
    visualOptions: options([nested("square", true, "circle", false), nested("pentagon", false, "circle", true), nested("square", false, "triangle", true), nested("triangle", false, "circle", true), nested("square", false, "circle", true)]),
    explanation: "Dış şekil üçgen-kare-beşgen; iç şekil daire-üçgen-kare düzeninde dağılır. Son hücre boş dış kare ve dolu iç dairedir.",
  },
  {
    id: 12, kind: "visual-odd", category: "Uyumsuz şekil",
    prompt: "Kuralı bozan seçenek hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 4,
    visualOptions: oddOptions([
      tile([shape("circle", false, 50, 50, 64), shape("triangle", true, 50, 50, 25, 0)], [], [dot("r")]),
      tile([shape("circle", false, 50, 50, 64), shape("triangle", true, 50, 50, 25, 90)], [], [dot("b")]),
      tile([shape("circle", false, 50, 50, 64), shape("triangle", true, 50, 50, 25, 180)], [], [dot("l")]),
      tile([shape("circle", false, 50, 50, 64), shape("triangle", true, 50, 50, 25, 270)], [], [dot("t")]),
      tile([shape("circle", false, 50, 50, 64), shape("triangle", true, 50, 50, 25, 0)], [], [dot("l")]),
    ]),
    explanation: "A-D seçeneklerinde nokta okun saat yönündeki yanındadır. E'de nokta ters taraftadır.",
  },
  {
    id: 20, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 2,
    visual: matrix([
      [lineTile([0, 90]), lineTile([90, 45]), lineTile([0, 45])],
      [lineTile([45, -45]), lineTile([-45, 0]), lineTile([45, 0])],
      [lineTile([90, 0, 45]), lineTile([0, 45, -45]), null],
    ]),
    visualOptions: options([lineTile([0, 90]), lineTile([45, -45]), lineTile([90, -45]), lineTile([90, 45]), lineTile([0, -45])]),
    explanation: "Son satırda yatay ve sağ çapraz çizgiler iki hücrede de bulunduğu için silinir; dikey ve sol çapraz çizgiler kalır.",
  },
  {
    id: 27, kind: "visual", category: "Görsel örüntü",
    prompt: "Sıradaki şekil hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 3,
    visual: sequence([polygonLine("triangle", false, 0, "tl"), polygonLine("square", true, 45, "tr"), polygonLine("pentagon", false, 90, "br"), polygonLine("hexagon", true, 135, "bl"), null]),
    visualOptions: options([polygonLine("hexagon", false, 0, "tl"), polygonLine("heptagon", true, 0, "tl"), polygonLine("heptagon", false, 90, "tl"), polygonLine("heptagon", false, 0, "tl"), polygonLine("heptagon", false, 0, "tr")]),
    explanation: "Sıradaki dış şekil yedigen ve boş olmalıdır; çizgi 180 dereceyle yatay görünür, nokta sol üste döner.",
  },
];

const set3: Question[] = [
  {
    id: 4, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 1,
    visual: matrix([
      [shapeDots("triangle", false, ["l"]), shapeDots("square", true, ["t"]), shapeDots("pentagon", false, ["r"])],
      [shapeDots("square", true, ["tl", "bl"]), shapeDots("pentagon", false, ["tl", "tr"]), shapeDots("triangle", true, ["tr", "br"])],
      [shapeDots("pentagon", false, ["tl", "l", "bl"]), shapeDots("triangle", true, ["tl", "t", "tr"]), null],
    ]),
    visualOptions: options([shapeDots("square", true, ["tr", "r", "br"]), shapeDots("square", false, ["tr", "r", "br"]), shapeDots("pentagon", false, ["tr", "r", "br"]), shapeDots("square", false, ["tr", "br"]), shapeDots("triangle", false, ["tr", "r", "br"])]),
    explanation: "Üçüncü satır üç nokta, üçüncü sütun sağ kenar ister. Şekil dizisi beşgen-üçgen-kare ve doluluk boş-dolu-boştur; sonuç sağında üç nokta bulunan boş karedir.",
  },
  {
    id: 12, kind: "visual-odd", category: "Uyumsuz şekil",
    prompt: "Kuralı bozan seçenek hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 4,
    visualOptions: oddOptions([
      tile([shape("square", false, 50, 50, 65), shape("triangle", true, 50, 50, 24, 0)], [], [dot("t")]),
      tile([shape("square", false, 50, 50, 65), shape("triangle", true, 50, 50, 24, 90)], [], [dot("r")]),
      tile([shape("square", false, 50, 50, 65), shape("triangle", true, 50, 50, 24, 180)], [], [dot("b")]),
      tile([shape("square", false, 50, 50, 65), shape("triangle", true, 50, 50, 24, 270)], [], [dot("l")]),
      tile([shape("square", false, 50, 50, 65), shape("triangle", true, 50, 50, 24, 0)], [], [dot("b")]),
    ]),
    explanation: "A-D seçeneklerinde üçgen noktaya bakar. E'de üçgen yukarı bakarken nokta aşağıdadır.",
  },
  {
    id: 20, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 1,
    visual: matrix([
      [countTile("circle", 1, false), countTile("circle", 2, true), countTile("circle", 3, true)],
      [countTile("triangle", 2, true), countTile("triangle", 1, false), countTile("triangle", 3, false)],
      [countTile("square", 1, false), countTile("square", 1, true), null],
    ]),
    visualOptions: options([countTile("square", 2, false), countTile("square", 2, true), countTile("square", 3, true), countTile("circle", 2, true), countTile("square", 1, true)]),
    explanation: "Son satırda 1 + 1 = 2 kare gerekir. Sağdaki girdi dolu olduğundan sonuç da iki dolu karedir.",
  },
  {
    id: 27, kind: "visual", category: "Görsel örüntü",
    prompt: "Sıradaki şekil hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 0,
    visual: sequence([lineTile([0, 90], ["tl"]), lineTile([90, 45], [], ["tr"]), lineTile([45, -45], ["br"]), lineTile([-45, 0], [], ["bl"]), null]),
    visualOptions: options([lineTile([0, 90], ["tl"]), lineTile([0, 45], ["tl"]), lineTile([0, 90], [], ["tl"]), lineTile([90, 45], ["tl"]), lineTile([0, 90], ["tr"])]),
    explanation: "Çizgi çifti yatay-dikey konumuna döner; nokta sol üste gelir ve yeniden dolu olur.",
  },
];

const set4: Question[] = [
  {
    id: 4, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 2,
    visual: matrix([
      [tile([shape("circle", false, 25, 25, 25), shape("square", true, 75, 75, 25)]), tile([shape("circle", false, 25, 25, 25), shape("triangle", true, 75, 25, 25)]), tile([shape("triangle", true, 75, 25, 25), shape("square", true, 75, 75, 25)])],
      [tile([shape("triangle", true, 75, 25, 25), shape("pentagon", false, 25, 75, 25)]), tile([shape("square", true, 75, 75, 25), shape("pentagon", false, 25, 75, 25)]), tile([shape("triangle", true, 75, 25, 25), shape("square", true, 75, 75, 25)])],
      [tile([shape("circle", false, 25, 25, 25), shape("triangle", true, 75, 25, 25), shape("square", true, 75, 75, 25)]), tile([shape("circle", false, 25, 25, 25), shape("square", true, 75, 75, 25), shape("pentagon", false, 25, 75, 25)]), null],
    ]),
    visualOptions: options([
      tile([shape("circle", false, 25, 25, 25), shape("pentagon", false, 25, 75, 25)]), tile([shape("triangle", true, 75, 25, 25), shape("square", true, 75, 75, 25)]), tile([shape("triangle", true, 75, 25, 25), shape("pentagon", false, 25, 75, 25)]), tile([shape("triangle", true, 75, 25, 25), shape("square", true, 75, 75, 25), shape("pentagon", false, 25, 75, 25)]), tile([shape("pentagon", false, 25, 75, 25)]),
    ]),
    explanation: "Son satırda daire ve kare iki kez göründüğü için silinir. Yalnız üçgen ile beşgen kalır.",
  },
  {
    id: 12, kind: "visual-odd", category: "Uyumsuz şekil",
    prompt: "Ayna görüntüsü olan seçenek hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 4,
    visualOptions: oddOptions([
      tile([shape("triangle", true, 50, 50, 25, 0), shape("square", false, 20, 20, 22)], [], [dot("br")]),
      tile([shape("triangle", true, 50, 50, 25, 90), shape("square", false, 80, 20, 22)], [], [dot("bl")]),
      tile([shape("triangle", true, 50, 50, 25, 180), shape("square", false, 80, 80, 22)], [], [dot("tl")]),
      tile([shape("triangle", true, 50, 50, 25, 270), shape("square", false, 20, 80, 22)], [], [dot("tr")]),
      tile([shape("triangle", true, 50, 50, 25, 90), shape("square", false, 80, 80, 22)], [], [dot("tl")]),
    ]),
    explanation: "A-D seçeneklerinde kare ve nokta karşı köşelerde kalırken tüm düzen birlikte döner. E aynı dönüşün ayna karşılığıdır.",
  },
  {
    id: 20, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 3,
    visual: matrix([
      [lineTile([0, 90, 45]), lineTile([90, 45, -45]), lineTile([90, 45])],
      [lineTile([0, -45, 90]), lineTile([0, 45, 90]), lineTile([0, 90])],
      [lineTile([45, -45, 90]), lineTile([45, 0, 90]), null],
    ]),
    visualOptions: options([lineTile([45]), lineTile([90]), lineTile([0, 90]), lineTile([45, 90]), lineTile([45, -45, 90])]),
    explanation: "Son satırın iki girdisinde ortak olan çizgiler sağ çapraz ve dikey çizgilerdir.",
  },
  {
    id: 27, kind: "visual", category: "Görsel örüntü",
    prompt: "Sıradaki şekil hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 1,
    visual: sequence([
      tile([shape("triangle", false, 50, 50, 40)], [], [dot("tl"), dot("br", false)]),
      tile([shape("square", true, 50, 50, 40)], [], [dot("tr", false, 12), dot("tr")]),
      tile([shape("pentagon", false, 50, 50, 40)], [], [dot("br"), dot("tl", false)]),
      tile([shape("triangle", true, 50, 50, 40)], [], [dot("bl", false, 12), dot("bl")]), null,
    ]),
    visualOptions: options([
      tile([shape("square", true, 50, 50, 40)], [], [dot("tl"), dot("br", false)]),
      tile([shape("square", false, 50, 50, 40)], [], [dot("tl"), dot("br", false)]),
      tile([shape("pentagon", false, 50, 50, 40)], [], [dot("tl"), dot("br", false)]),
      tile([shape("square", false, 50, 50, 40)], [], [dot("tr"), dot("bl", false)]),
      tile([shape("square", false, 50, 50, 40)], [], [dot("br"), dot("tl", false)]),
    ]),
    explanation: "Şekil döngüsü üçgen-kare-beşgen olduğundan sırada boş kare vardır. Dolu nokta sol üste, boş nokta sağ alta gelir.",
  },
];

const set5: Question[] = [
  {
    id: 4, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 4,
    visual: matrix([
      [lineTile([0, 45]), lineTile([45, 90]), lineTile([0, 90])],
      [lineTile([0, 45, -45]), lineTile([45, 90]), lineTile([0, 90, 45])],
      [lineTile([90, -45]), lineTile([0, -45, 45]), null],
    ]),
    visualOptions: options([lineTile([0, 90]), lineTile([0, 45, -45]), lineTile([90, 45]), lineTile([0, 90, 45]), lineTile([0, 90, -45])]),
    explanation: "Son satırda ortak sol çapraz silinir; dikey, yatay ve sağ çapraz kalır. Bu küme 90 derece dönünce yatay, dikey ve sol çapraz oluşur.",
  },
  {
    id: 12, kind: "visual-odd", category: "Görsel dönüşüm",
    prompt: "Dönüşüm kuralını bozan seçenek hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 4,
    visualOptions: oddOptions([
      tile([shape("triangle", false, 24, 50, 28, 0), shape("triangle", true, 76, 50, 28, 90)], [], [], true),
      tile([shape("triangle", true, 24, 50, 28, 90), shape("triangle", false, 76, 50, 28, 180)], [], [], true),
      tile([shape("triangle", false, 24, 50, 28, 180), shape("triangle", true, 76, 50, 28, 270)], [], [], true),
      tile([shape("triangle", true, 24, 50, 28, 270), shape("triangle", false, 76, 50, 28, 360)], [], [], true),
      tile([shape("triangle", false, 24, 50, 28, 0), shape("triangle", false, 76, 50, 28, 90)], [], [], true),
    ]),
    explanation: "A-D seçeneklerinde hem 90 derece dönüş hem doluluk değişimi vardır. E yalnızca döner; doluluk değişmez.",
  },
  {
    id: 20, kind: "visual", category: "Şekil matrisi",
    prompt: "Eksik hücre hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 2,
    visual: matrix([
      [tile([shape("triangle", false, 50, 50, 66)], [line(0, 50, 50, 34)], [dot("t")]), tile([shape("square", true, 50, 50, 66)], [line(45, 50, 50, 34)], [dot("l"), dot("r")]), tile([shape("pentagon", false, 50, 50, 66)], [line(90, 50, 50, 34)], [dot("t"), dot("bl"), dot("br")])],
      [tile([shape("square", true, 50, 50, 66)], [line(90, 50, 50, 34)], [dot("l"), dot("r")]), tile([shape("pentagon", false, 50, 50, 66)], [line(0, 50, 50, 34)], [dot("t"), dot("bl"), dot("br")]), tile([shape("triangle", true, 50, 50, 66)], [line(45, 50, 50, 34)], [dot("t")])],
      [tile([shape("pentagon", false, 50, 50, 66)], [line(45, 50, 50, 34)], [dot("t"), dot("bl"), dot("br")]), tile([shape("triangle", true, 50, 50, 66)], [line(90, 50, 50, 34)], [dot("t")]), null],
    ]),
    visualOptions: options([
      tile([shape("square", true, 50, 50, 66)], [line(0, 50, 50, 34)], [dot("l"), dot("r")]),
      tile([shape("pentagon", false, 50, 50, 66)], [line(0, 50, 50, 34)], [dot("l"), dot("r")]),
      tile([shape("square", false, 50, 50, 66)], [line(0, 50, 50, 34)], [dot("l"), dot("r")]),
      tile([shape("square", false, 50, 50, 66)], [line(45, 50, 50, 34)], [dot("l"), dot("r")]),
      tile([shape("square", false, 50, 50, 66)], [line(0, 50, 50, 34)], [dot("t")]),
    ]),
    explanation: "Son hücre dışta boş kare, içeride yatay çizgi ve iki nokta gerektirir. Dört özellik de hem satır hem sütun kuralını aynı anda tamamlar.",
  },
  {
    id: 27, kind: "visual", category: "Görsel örüntü",
    prompt: "Sıradaki şekil hangisidir?", options: ["A", "B", "C", "D", "E"], answer: 3,
    visual: sequence([
      tile([shape("triangle", false, 50, 50, 66)], [line(-45), line(0)], [dot("t")]),
      tile([shape("square", false, 50, 50, 66)], [line(0), line(90)], [dot("r")]),
      tile([shape("pentagon", true, 50, 50, 66)], [line(90), line(45)], [dot("b")]),
      tile([shape("hexagon", true, 50, 50, 66)], [line(45), line(-45)], [dot("l")]), null,
    ]),
    visualOptions: options([
      tile([shape("heptagon", true, 50, 50, 66)], [line(-45), line(0)], [dot("t")]),
      tile([shape("hexagon", false, 50, 50, 66)], [line(-45), line(0)], [dot("t")]),
      tile([shape("heptagon", false, 50, 50, 66)], [line(0), line(90)], [dot("t")]),
      tile([shape("heptagon", false, 50, 50, 66)], [line(-45), line(0)], [dot("t")]),
      tile([shape("heptagon", false, 50, 50, 66)], [line(-45), line(0)], [dot("r")]),
    ]),
    explanation: "Sıradaki şekil boş yedigen olmalıdır. Kayan çizgi çifti sol çapraz-yatay, nokta ise yeniden üst konuma gelir.",
  },
];

export const advancedVisualQuestions: Record<number, Question[]> = { 1: set1, 2: set2, 3: set3, 4: set4, 5: set5 };
