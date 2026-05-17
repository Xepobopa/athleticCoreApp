export type Exercise = {
  id: string;
  name: string;
  muscles: string[];
  instructions: string;
  videoUrl: string;
};

export type ProgramDay = {
  day: number;
  title: string;
  exercises: Exercise[]; 
};

export type Program = {
  id: string;
  title: string;
  isIntense: boolean;
  description: string;
  img_url: string;
  equipment: string[];
  days: ProgramDay[];
};

export const PROGRAMS_DATA: Program[] = [
  {
    id: 'prog_1',
    isIntense: true,
    title: 'Full Body',
    description: 'Інтенсивне 7-денне тренування всього тіла для розвитку сили.',
    img_url: 'https://thumbs.dreamstime.com/b/strong-bodybuilder-doing-exercises-dumbbells-turned-back-muscular-male-model-isolated-over-black-background-55122269.jpg',
    equipment: ['Гантелі', 'Штанга'],
    days: [
      {
        day: 1,
        title: 'Верх тіла',
        exercises: [
          {
            id: 'exc_1_1',
            name: 'Віджимання',
            muscles: ['Груди', 'Трицепси', 'Плечі', 'Спина'],
            instructions: 'Тримайте корпус напруженим, а спину прямою. Опускайтеся вниз, доки груди майже не торкнуться підлоги',
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' 
          },
          {
            id: 'exc_1_2',
            name: 'Підтягування',
            muscles: ['Спина', 'Біцепч'],
            instructions: 'Підтягуйтесь, поки підборіддя не перетне перекладину.',
            videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g'
          }
        ]
      },
      { day: 2, title: 'Нижня частина тіла', exercises: [] },
      { day: 3, title: 'Відпочинок', exercises: [] },
      { day: 4, title: 'Відпочинок', exercises: [] },
      { day: 5, title: 'Кардіо', exercises: [] },
      { day: 6, title: 'Full Body', exercises: [] },
      { day: 7, title: 'Відпочинок', exercises: [] },
    ]
  },
  {
    id: 'prog_2',
    isIntense: false,
    title: "Мʼязи кору",
    description: 'Зосередження на пресі та попереку',
    img_url: 'https://thumbs.dreamstime.com/b/handsome-power-athletic-young-man-great-physique-strong-bodybuilder-six-pack-perfect-abs-shoulders-biceps-triceps-55122268.jpg',
    equipment: ['Вага тіла'],
    days: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, exercises: [] }))
  },
  {
    id: 'prog_3',
    isIntense: false,
    title: 'мобільність',
    description: "Розтягніть і розслабте м'язи.",
    img_url: 'https://thumbs.dreamstime.com/b/yoga-workout-young-pretty-girl-stretching-legs-31488562.jpg',
    equipment: ['Мат для йоги'],
    days: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, exercises: [] }))
  }
];