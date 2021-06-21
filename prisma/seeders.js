export const users = [
    {
      username: 'PAXANDDOS',
      email: 'pashalitovka@gmail.com',
      calendars: {
        create: [
          {
            title: "My calendar",
            events: {
              create: [
                {
                  title: 'New event',
                  content: 'https://www.twitter.com/prisma'
                },
                {
                  title: 'New event 2',
                  content: 'https://paxanddos.github.io/'
                }
              ]
            }
          },
          {
            title: "New calendar",
            events: {
              create: [
                {
                  title: 'New event',
                  content: 'https://www.twitter.com/prisma'
                }
              ]
            }
          }
        ]
      }
    },
    {
      username: 'leosh1d',
      email: 'leosh1d@gmail.com',
      calendars: {
        create: [
          {
            title: "My calendar",
            events: {
              create: [
                {
                  title: 'New event',
                  content: 'https://leosh1d.github.io/'
                },
                {
                  title: 'New event 2',
                  content: 'https://paxanddos.github.io/'
                }
              ]
            }
          }
        ]
      }
    },
]

export const categories = [
    {
      name: "Arrangement",
      target: "06-20-2021",
      duration: 3
    },
    {
      name: "Reminder",
      target: "06-20-2021"
    },
    {
      name: "Task",
      target: "06-20-2021"
    }
]
