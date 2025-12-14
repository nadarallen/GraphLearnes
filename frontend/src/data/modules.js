export const dsModules = [
    {
      id: "ds-intro",
      title: "01. Intro to DS",
      longDescription:
        "Foundations of data organization. Covers Big O notation, time/space complexity analysis, and basic memory allocation strategies.",
      color: "#ff0055",
      prerequisites: [
        {
          id: "p1",
          title: "Basic Programming",
          description:
            "Control flow (if/else), loops, and syntax in C/Java/Python.",
        },
        {
          id: "p2",
          title: "Data Types",
          description: "Primitives: int, float, char, boolean.",
        },
        {
          id: "p3",
          title: "Arrays",
          description: "Contiguous memory allocation and indexing.",
        },
        {
          id: "p4",
          title: "Loops",
          description: "Iterative logic construction.",
        },
      ],
    },
    {
      id: "ds-stacks",
      title: "02. Stacks & Queues",
      longDescription:
        "Linear data structures. Stack (LIFO) used in recursion/undo. Queue (FIFO) used in scheduling/buffering.",
      color: "#00cc88",
      prerequisites: [
        {
          id: "p3",
          title: "Arrays",
          description: "Used for static implementation of stacks.",
        },
        {
          id: "p5",
          title: "Functions",
          description: "Modularizing Push, Pop, and Peek operations.",
        },
        {
          id: "p6",
          title: "Expressions",
          description: "Infix, Prefix, Postfix conversion logic.",
        },
        {
          id: "p7",
          title: "ADT",
          description: "Abstract Data Types concept.",
        },
      ],
    },
    {
      id: "ds-linked",
      title: "03. Linked Lists",
      longDescription:
        "Nodes linked via pointers. Allows dynamic memory usage. Includes Singly, Doubly, and Circular lists.",
      color: "#22aaff",
      prerequisites: [
        {
          id: "p8",
          title: "Pointers",
          description: "Memory addressing and dereferencing.",
        },
        {
          id: "p9",
          title: "Dynamic Memory",
          description: "Heap allocation (malloc/new).",
        },
        {
          id: "p10",
          title: "Structs",
          description: "Creating custom data types for Nodes.",
        },
        {
          id: "p11",
          title: "Memory Layout",
          description: "Understanding non-contiguous memory.",
        },
      ],
    },
    {
      id: "ds-trees",
      title: "04. Trees",
      longDescription:
        "Hierarchical structures. Binary Trees, BST, AVL. Essential for fast searching and sorting data.",
      color: "#ffaa00",
      prerequisites: [
        {
          id: "p12",
          title: "Linked Lists",
          description:
            "Tree nodes are essentially linked list nodes with multiple pointers.",
        },
        {
          id: "p13",
          title: "Recursion",
          description: "The primary method for traversing trees.",
        },
        {
          id: "p14",
          title: "Stack",
          description: "Used for iterative traversals (DFS).",
        },
        {
          id: "p15",
          title: "Binary Search",
          description: "The logic behind BST efficiency.",
        },
      ],
    },
    {
      id: "ds-graphs",
      title: "05. Graphs",
      longDescription:
        "Complex networks (Social media, Maps). Nodes (Vertices) and Edges. Algorithms: BFS, DFS, Dijkstra.",
      color: "#9900ff",
      prerequisites: [
        {
          id: "p16",
          title: "Tree Traversal",
          description:
            "Graph traversal is a generalization of tree traversal.",
        },
        {
          id: "p17",
          title: "Queue & Stack",
          description: "BFS uses Queue, DFS uses Stack.",
        },
        {
          id: "p18",
          title: "Matrices",
          description: "Adjacency Matrix representation.",
        },
        {
          id: "p13",
          title: "Recursion",
          description: "Deep traversal logic.",
        },
      ],
    },
    {
      id: "ds-search",
      title: "06. Searching",
      longDescription:
        "Finding data efficiently. Linear Search (O(n)) vs Binary Search (O(log n)) vs Hashing (O(1)).",
      color: "#00ccff",
      prerequisites: [
        {
          id: "p3",
          title: "Arrays",
          description: "The dataset structure.",
        },
        {
          id: "p15",
          title: "Algorithms",
          description: "Step-by-step logic execution.",
        },
        {
          id: "p19",
          title: "Math (Modulo)",
          description: "Key for Hash Function design.",
        },
        {
          id: "p20",
          title: "Logic",
          description: "Optimizing for edge cases.",
        },
      ],
    },
  ];
