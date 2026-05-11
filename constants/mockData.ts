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
    title: 'Full Body Blast',
    description: 'Intense 7-day full body workout to build strength.',
    img_url: 'https://thumbs.dreamstime.com/b/strong-bodybuilder-doing-exercises-dumbbells-turned-back-muscular-male-model-isolated-over-black-background-55122269.jpg',
    equipment: ['Dumbbells', 'Barbell'],
    days: [
      {
        day: 1,
        title: 'Upper Body',
        exercises: [
          {
            id: 'exc_1_1',
            name: 'Push Ups',
            muscles: ['Chest', 'Triceps', 'Shoulders', 'Back'],
            instructions: 'Keep your core tight and back straight. Lower your body until your chest nearly touches the floor.',
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' 
          },
          {
            id: 'exc_1_2',
            name: 'Pull Ups',
            muscles: ['Back', 'Biceps'],
            instructions: 'Pull yourself up until your chin passes the bar.',
            videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g'
          }
        ]
      },
      { day: 2, title: 'Lower Body', exercises: [] },
      { day: 3, title: 'Rest', exercises: [] },
      { day: 4, title: 'Core', exercises: [] },
      { day: 5, title: 'Cardio', exercises: [] },
      { day: 6, title: 'Full Body', exercises: [] },
      { day: 7, title: 'Rest', exercises: [] },
    ]
  },
  {
    id: 'prog_2',
    isIntense: false,
    title: 'Core Crusher',
    description: 'Focus on your abs and lower back',
    img_url: 'https://thumbs.dreamstime.com/b/handsome-power-athletic-young-man-great-physique-strong-bodybuilder-six-pack-perfect-abs-shoulders-biceps-triceps-55122268.jpg',
    equipment: ['Bodyweight'],
    days: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, exercises: [] }))
  },
  {
    id: 'prog_3',
    isIntense: false,
    title: 'Mobility Flow',
    description: 'Stretch and relax your muscles.',
    img_url: 'https://thumbs.dreamstime.com/b/yoga-workout-young-pretty-girl-stretching-legs-31488562.jpg',
    equipment: ['Yoga Mat'],
    days: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, exercises: [] }))
  }
];