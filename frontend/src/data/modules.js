  export const dsModules = [
    {
      id: "ds-intro",
      title: "01. Intro to DS",
      longDescription:
        "Foundations of data organization. Covers Big O notation, time/space complexity analysis, and basic memory allocation strategies.",
      detail:
        "Data Structures are specialized formats for organizing, processing, retrieving, and storing data. This module introduces the core concepts of efficiency (Time & Space Complexity) using Big O notation, which allows us to measure how algorithms scale with input size. We also explore how memory is allocated (Stack vs Heap) and why choosing the right structure matters.",
      why: "Before writing code, you must understand how to measure its efficiency. Without this foundation, you cannot evaluate whether a solution is 'good' or 'scalable'.",
      references: [
        "CLRS: Chapter 1 (Role of Algorithms)",
        "Big O Cheat Sheet",
        "MDN: Memory Management"
      ],
      color: "#ff0055",
      prerequisites: [
        {
          id: "p1",
          title: "Basic Programming",
          description: "Control flow (if/else), loops, and syntax in C/Java/Python.",
          detail: "Understanding the syntax and semantics of a programming language. This includes variables, decision-making structures (if-else, switch), and loop constructs (for, while).",
          why: "You cannot build data structures without knowing how to tell the computer what to do using code.",
          references: ["MDN: Control Flow", "W3Schools: C++ Syntax"]
        },
        {
          id: "p2",
          title: "Data Types",
          description: "Primitives: int, float, char, boolean.",
          detail: "Fundamental building blocks of data. Integers for counts, Floats for precision, Chars for text, and Booleans for logic.",
          why: "Computers interpret bits differently based on type. Knowing the difference prevents overflow errors and memory waste.",
          references: ["GeeksForGeeks: C Data Types", "Java Docs: Primitives"]
        },
        {
          id: "p3",
          title: "Arrays",
          description: "Contiguous memory allocation and indexing.",
          detail: "An array is a collection of items stored at contiguous memory locations. It is the simplest data structure where each data element can be accessed directly by only using its index number.",
          why: "Arrays are the most basic way to store lists of data and are used to implement almost all other complicated data structures.",
          references: ["Wikipedia: Array Data Structure", "MDN: JavaScript Arrays"]
        },
        {
          id: "p4",
          title: "Loops",
          description: "Iterative logic construction.",
          detail: "Repeating a block of code multiple times. Essential for traversing arrays and other structures.",
          why: "Manual repetition is inefficient. Loops allow us to process millions of data points with a few lines of code.",
          references: ["MDN: Loops and iteration", "C++ Reference: Iteration"]
        },
      ],
    },
    {
      id: "ds-stacks",
      title: "02. Stacks & Queues",
      longDescription:
        "Linear data structures. Stack (LIFO) used in recursion/undo. Queue (FIFO) used in scheduling/buffering.",
      detail:
        "Stacks follow the Last-In-First-Out (LIFO) principle, similar to a stack of plates. Queues follow First-In-First-Out (FIFO), like a line at a store. They are fundamental abstract data types restricted to specific operations (Push/Pop for Stacks, Enqueue/Dequeue for Queues).",
      why: "These are the building blocks of more complex systems. Stacks power function calls (recursion) and 'Undo' features. Queues power task scheduling (printers, CPU) and breadth-first searches.",
      references: [
        "CLRS: Chapter 10 (Elementary Data Structures)",
        "GeeksforGeeks: Stack & Queue",
        "VisualAlgo: Stack/Queue/List"
      ],
      color: "#00cc88",
      prerequisites: [
        {
          id: "p1", // Added for connectivity
          title: "Basic Programming",
          description: "Control flow (if/else), loops, and syntax.",
          detail: "Understanding the syntax and semantics of a programming language. This includes variables, decision-making structures (if-else, switch), and loop constructs (for, while).",
          why: "You cannot build data structures without knowing how to tell the computer what to do using code.",
          references: ["MDN: Control Flow", "W3Schools: C++ Syntax"]
        },
        {
          id: "p3",
          title: "Arrays",
          description: "Used for static implementation of stacks.",
          detail: "Arrays provide a fixed-size container to hold stack elements.",
          why: "One of the two primary ways to implement a stack (the other being Linked Lists).",
          references: ["GeeksForGeeks: Stack using Arrays"]
        },
        {
          id: "p5",
          title: "Functions",
          description: "Modularizing Push, Pop, and Peek operations.",
          detail: "Encapsulating logic into reusable blocks. A 'Push' function handles the logic of adding an item, abstracting the complexity.",
          why: "Clean code requires modularity. You don't want to rewrite the logic for adding an item every time you need it.",
          references: ["Clean Code (Robert Martin)", "MDN: Functions"]
        },
        {
          id: "p6",
          title: "Expressions",
          description: "Infix, Prefix, Postfix conversion logic.",
          detail: "Mathematical notations. Infix is human-readable (A+B). Postfix (AB+) is machine-friendly and easier to evaluate using a stack.",
          why: "Compilers use stacks to evaluate complex mathematical expressions by converting them to postfix notation.",
          references: ["Wikipedia: Reverse Polish Notation"]
        },
        {
          id: "p7",
          title: "ADT",
          description: "Abstract Data Types concept.",
          detail: "An ADT defines *what* a data structure does, not *how* it does it. It specifies the interface (e.g., Stack must have Push/Pop).",
          why: "Separating interface from implementation allows us to change the underlying code (Array vs Linked List) without breaking the rest of the app.",
          references: ["Wikipedia: Abstract Data Type"]
        },
      ],
    },
    {
      id: "ds-linked",
      title: "03. Linked Lists",
      longDescription:
        "Nodes linked via pointers. Allows dynamic memory usage. Includes Singly, Doubly, and Circular lists.",
      detail:
        "A Linked List is a linear data structure where elements are not stored at contiguous memory locations. The elements are linked using pointers as shown in the graph. We cover Singly Linked Lists (one-way), Doubly Linked Lists (two-way), and Circular Lists.",
      why: "Standard arrays have fixed size. Linked Lists allow dynamic memory allocation, meaning your data structure can grow and shrink at runtime without pre-allocating memory.",
      references: [
        "CLRS: Chapter 10.2 (Linked Lists)",
        "Stanford CS Library: Linked Lists",
        "LeetCode: Linked List Explorercard"
      ],
      color: "#22aaff",
      prerequisites: [
        {
          id: "p1", // Added for connectivity
          title: "Basic Programming",
          description: "Control flow (if/else), loops, and syntax.",
          detail: "Understanding the syntax and semantics of a programming language. This includes variables, decision-making structures (if-else, switch), and loop constructs (for, while).",
          why: "You cannot build data structures without knowing how to tell the computer what to do using code.",
          references: ["MDN: Control Flow", "W3Schools: C++ Syntax"]
        },
        {
          id: "p8",
          title: "Pointers",
          description: "Memory addressing and dereferencing.",
          detail: "Variables that store the address of another variable. Pointers are the literal 'links' in a linked list.",
          why: "Without pointers, you cannot chain nodes together in non-contiguous memory.",
          references: ["Cplusplus.com: Pointers", "YouTube: MyCodeSchool Pointers"]
        },
        {
          id: "p9",
          title: "Dynamic Memory",
          description: "Heap allocation (malloc/new).",
          detail: "Allocating memory at runtime (Heap) vs compile time (Stack). 'malloc' in C or 'new' in C++.",
          why: "Linked Lists grow indefinitely. You need the Heap specifically because Stack memory is temporary and limited.",
          references: ["GeeksForGeeks: Dynamic Memory Allocation"]
        },
        {
          id: "p10",
          title: "Structs",
          description: "Creating custom data types for Nodes.",
          detail: "Composite data types that group variables. A Node struct typically contains 'data' and a 'next' pointer.",
          why: "We need a single unit that can hold both the value and the connection to the next value.",
          references: ["C Programming: Structs"]
        },
        {
          id: "p11",
          title: "Memory Layout",
          description: "Understanding non-contiguous memory.",
          detail: "How data is scattered across RAM. Unlike arrays, linked list nodes can be anywhere in memory.",
          why: "Understanding this helps explain why Arrays have fast cache locality (faster lookup) while Linked Lists do not.",
          references: ["Computer Systems: A Programmer's Perspective"]
        },
      ],
    },
    {
      id: "ds-trees",
      title: "04. Trees",
      longDescription:
        "Hierarchical structures. Binary Trees, BST, AVL. Essential for fast searching and sorting data.",
      detail:
        "Trees represent hierarchical data. A Binary Tree has at most two children per node. A Binary Search Tree (BST) is sorted, allowing for fast lookup. AVL Trees are self-balancing BSTs to ensure performance doesn't degrade.",
      why: "Hierarchical data is everywhere (file systems, HTML DOM). BSTs allow searching in O(log n) time, which is exponentially faster than O(n) for large datasets.",
      references: [
        "CLRS: Chapter 12 (Binary Search Trees)",
        "CMU: Trees and Graphs",
        "VisualAlgo: BST"
      ],
      color: "#ffaa00",
      prerequisites: [
        {
          id: "p12",
          title: "Linked Lists",
          description: "Tree nodes are essentially linked list nodes with multiple pointers.",
          detail: "Trees are a natural evolution of linked lists. Instead of one 'next' pointer, a tree node has 'left' and 'right' pointers.",
          why: "Understanding how to manage pointers in a list is the direct precursor to managing them in a tree.",
          references: ["GeeksForGeeks: Binary Tree Data Structure"]
        },
        {
          id: "p13",
          title: "Recursion",
          description: "The primary method for traversing trees.",
          detail: "A function calling itself. Trees are recursive structures (a tree is a root plus sub-trees), so recursion is the most natural way to process them.",
          why: "Iterative tree code is complex and messy. Recursive tree code is elegant and simple.",
          references: ["MIT OCW: Recursion"]
        },
        {
          id: "p14",
          title: "Stack",
          description: "Used for iterative traversals (DFS).",
          detail: "When traversing a tree iteratively, we need a way to 'remember' where we came from to go back up. A Stack is perfect for this.",
          why: "Deep First Search (DFS) explicitly uses a stack (or the implicit call stack via recursion).",
          references: ["Wikipedia: Depth-first search"]
        },
        {
          id: "p15",
          title: "Binary Search",
          description: "The logic behind BST efficiency.",
          detail: "A divide-and-conquer algorithm that halves the search space at each step.",
          why: "BSTs are essentially the data structure equivalent of the Binary Search algorithm.",
          references: ["Khan Academy: Binary Search"]
        },
      ],
    },
    {
      id: "ds-graphs",
      title: "05. Graphs",
      longDescription:
        "Complex networks (Social media, Maps). Nodes (Vertices) and Edges. Algorithms: BFS, DFS, Dijkstra.",
      detail:
        "A Graph consists of vertices (nodes) and edges (links). They can be directed or undirected, weighted or unweighted. We cover traversal algorithms (BFS, DFS) and shortest path algorithms (Dijkstra).",
      why: "Graphs model real-world relationships: Social Networks (friends), GPS Navigation (roads), and the Internet itself (hyperlinks). Mastering graphs unlocks the ability to solve complex connection problems.",
      references: [
        "CLRS: Chapter 22 (Elementary Graph Algorithms)",
        "Google Maps Engineering Blog",
        "Khan Academy: Graph Theory"
      ],
      color: "#9900ff",
      prerequisites: [
        {
          id: "p16",
          title: "Tree Traversal",
          description: "Graph traversal is a generalization of tree traversal.",
          detail: "Pre-order, In-order, Post-order traversals. Understanding how to visit every node in a tree prepares you for doing the same in a graph.",
          why: "Graphs often contain loops (cycles), which is the main difference from trees. The core logic of visiting neighbors remains.",
          references: ["Wikipedia: Tree Traversal"]
        },
        {
          id: "p17",
          title: "Queue & Stack",
          description: "BFS uses Queue, DFS uses Stack.",
          detail: "Two primary search strategies: Breadth-First (Layer by layer) uses a Queue. Depth-First (Deep dive) uses a Stack.",
          why: "The only difference between BFS and DFS code is literally swapping a Queue for a Stack.",
          references: ["VisualAlgo: DFS & BFS"]
        },
        {
          id: "p18",
          title: "Matrices",
          description: "Adjacency Matrix representation.",
          detail: "Representing connections using a 2D grid (Matrix). M[i][j] = 1 means node i relates to node j.",
          why: "Matrices allow for O(1) lookup to check if two nodes are connected, though they use O(V^2) space.",
          references: ["Wolfram MathWorld: Adjacency Matrix"]
        },
        {
          id: "p13", // ID reused is intentional as it is the same concept
          title: "Recursion",
          description: "Deep traversal logic.",
          detail: "Recursion is heavily used in DFS and complex graph algorithms like topological sort.",
          why: "Simplifies state management in backtracking algorithms (like finding a maze path).",
          references: ["GeeksForGeeks: Graph Recursion"]
        },
      ],
    },
    {
      id: "ds-search",
      title: "06. Searching",
      longDescription:
        "Finding data efficiently. Linear Search (O(n)) vs Binary Search (O(log n)) vs Hashing (O(1)).",
      detail:
        "Searching is the process of retrieving information from a data structure. We compare Linear Search (checking every element), Binary Search (dividing the search space), and Hashing (direct access via key).",
      why: "Retrieving data quickly is critical for performance. The difference between O(n) and O(log n) or O(1) determines whether a system can handle 100 users or 100 million users.",
      references: [
        "CLRS: Chapter 11 (Hash Tables)",
        "Knuth: Art of Computer Programming Vol 3",
        "CS50: Search"
      ],
      color: "#00ccff",
      prerequisites: [
        {
          id: "p3",
          title: "Arrays",
          description: "The dataset structure.",
          detail: "Most basic search algorithms operate on arrays. Understanding indexing is prerequisite #1.",
          why: "Search happens on a collection. Arrays are the default collection.",
          references: ["MDN: Arrays"]
        },
        {
          id: "p21", // CHANGED FROM p15 to p21 to avoid collision with "Binary Search"
          title: "Algorithms",
          description: "Step-by-step logic execution.",
          detail: "An algorithm is a finite sequence of well-defined instructions. Search is just a specific category of algorithms.",
          why: "You are learning to design algorithms, not just memorize code.",
          references: ["Wikipedia: Algorithm"]
        },
        {
          id: "p19",
          title: "Math (Modulo)",
          description: "Key for Hash Function design.",
          detail: "The modulo operator (%) finds the remainder of division. It is the core mathematical operation for Hash Tables.",
          why: "It ensures that any number (key) can be mapped to a valid index (0 to N-1) in your table.",
          references: ["Khan Academy: Modular Arithmetic"]
        },
        {
          id: "p20",
          title: "Logic",
          description: "Optimizing for edge cases.",
          detail: "Boolean logic (AND, OR, NOT) and handling boundary conditions (empty lists, duplicates).",
          why: "Search algorithms fail at the edges. Good logic ensures robustness.",
          references: ["Brilliant: Logic"]
        },
      ],
    },
  ];
