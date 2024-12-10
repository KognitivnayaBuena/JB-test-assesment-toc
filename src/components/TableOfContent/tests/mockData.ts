import { TOCNode } from "../utils";

const mockData: TOCNode[] = [
  {
    id: '1',
    title: 'Node 1',
    path: '/node1',
    level: 0,
    children: [
      {
        id: '1.1',
        title: 'Child Node 1.1',
        path: '/node1/child1',
        level: 1,
        children: [],
      },
    ],
  },
  {
    id: '2',
    title: 'Node 2',
    path: '/node2',
    level: 0,
    children: [
      {
        id: '2.1',
        title: 'Child Node 2.1',
        path: '/node2/child2.1',
        level: 1,
        children: [],
      },
      {
        id: '2.2',
        title: 'Child Node 2.2',
        path: '/node2/child2.2',
        level: 1,
        children: [],
      },
      {
        id: '2.3',
        title: 'Child Node 2.3',
        path: '/node2/child2.3',
        level: 1,
        children: [],
      },
    ],
  },
  {
    id: '3',
    title: 'Node 3',
    path: '/node3',
    level: 0,
    children: [
      {
        id: '3.1',
        title: 'Child Node 3.1',
        path: '/node3/child3.1',
        level: 1,
        children: [],
      },
      {
        id: '3.2',
        title: 'Child Node 3.2',
        path: '/node3/child3.2',
        level: 1,
        children: [],
      },
      {
        id: '3.3',
        title: 'Child Node 3.3',
        path: '/node3/child3.3',
        level: 1,
        children: [
          {
            id: '3.3.1',
            title: 'Child Node 3.3.1',
            path: '/node3/child3.3/child3.3.1',
            level: 2,
            children: [],
          },
          {
            id: '3.3.2',
            title: 'Child Node 3.3.2',
            path: '/node3/child3.3/child3.3.2',
            level: 2,
            children: [],
          },
          {
            id: '3.3.3',
            title: 'Child Node 3.3.3',
            path: '/node3/child3.3/child3.3.3',
            level: 2,
            children: [
              {
                id: '3.3.3.1',
                title: 'Child Node 3.3.3.1',
                path: '/node3/child3.3/child3.3.3/child3.3.3.1',
                level: 3,
                children: [],
              },
              {
                id: '3.3.3.2',
                title: 'Child Node 3.3.3.2',
                path: '/node3/child3.3/child3.3.3/child3.3.3.2',
                level: 3,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Node 4',
    path: '/node4',
    level: 0,
    children: [],
  },
  {
    id: '5',
    title: 'Node 5',
    path: '/node5',
    level: 0,
    children: [
      {
        id: '5.1',
        title: 'Child Node 5.1',
        path: '/node5/child5.1',
        level: 1,
        children: [],
      },
    ],
  },
];

export default mockData;