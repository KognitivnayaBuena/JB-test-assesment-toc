import { TOCData } from "../types";

const mockData: TOCData = {
  entities: {
    pages: {
      "1.1": {
        id: "1.1",
        title: "Child Node 1.1",
        level: 1,
        pages: []
      },
      "1": {
        id: "1",
        title: "Node 1",
        level: 0,
        pages: ["1.1"]
      },
      "2.1": {
        id: "2.1",
        title: "Child Node 2.1",
        level: 1,
        pages: []
      },
      "2.2": {
        id: "2.2",
        title: "Child Node 2.2",
        level: 1,
        pages: []
      },
      "2.3": {
        id: "2.3",
        title: "Child Node 2.3",
        level: 1,
        pages: []
      },
      "2": {
        id: "2",
        title: "Node 2",
        level: 0,
        pages: ["2.1", "2.2", "2.3"]
      },
      "3.1": {
        id: "3.1",
        title: "Child Node 3.1",
        level: 1,
        pages: []
      },
      "3.2": {
        id: "3.2",
        title: "Child Node 3.2",
        level: 1,
        pages: []
      },
      "3.3.1": {
        id: "3.3.1",
        title: "Child Node 3.3.1",
        level: 2,
        pages: []
      },
      "3.3.2": {
        id: "3.3.2",
        title: "Child Node 3.3.2",
        level: 2,
        pages: []
      },
      "3.3.3.1": {
        id: "3.3.3.1",
        title: "Child Node 3.3.3.1",
        level: 3,
        pages: []
      },
      "3.3.3.2": {
        id: "3.3.3.2",
        title: "Child Node 3.3.3.2",
        level: 3,
        pages: []
      },
      "3.3.3": {
        id: "3.3.3",
        title: "Child Node 3.3.3",
        level: 2,
        pages: ["3.3.3.1", "3.3.3.2"]
      },
      "3.3": {
        id: "3.3",
        title: "Child Node 3.3",
        level: 1,
        pages: ["3.3.1", "3.3.2", "3.3.3"]
      },
      "3": {
        id: "3",
        title: "Node 3",
        level: 0,
        pages: ["3.1", "3.2", "3.3"]
      },
      "4": {
        id: "4",
        title: "Node 4",
        level: 0,
        pages: []
      },
      "5.1": {
        id: "5.1",
        title: "Child Node 5.1",
        level: 1,
        pages: []
      },
      "5": {
        id: "5",
        title: "Node 5",
        level: 0,
        pages: ["5.1"]
      }
    }
  },
  topLevelIds: ["1", "2", "3", "4", "5"]
}


export default mockData;
