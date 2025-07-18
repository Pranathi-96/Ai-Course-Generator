import type { Course, Module, Lesson, Question } from "@/types/course"

/**
 * Generates a full course outline (modules ➜ lessons ➜ questions)
 * completely on the server – no external API calls for now.
 */
export class CourseGenerator {
  // ────────────────────────────────────────────────────────────
  // PUBLIC API
  // ────────────────────────────────────────────────────────────
  static async generateCourse(
    topic: string,
    difficulty: "beginner" | "intermediate" | "advanced",
    audience: string,
    userId: string, // Added userId parameter
  ): Promise<Course> {
    // Simulate a call to an LLM or other heavy process
    await new Promise((r) => setTimeout(r, 2_000))

    const modules = await this.generateModules(topic, difficulty, audience)
    return {
      id: Date.now().toString(),
      title: `Complete ${topic} Course`,
      description: `A comprehensive ${difficulty}-level course on ${topic} designed for ${audience}.`,
      topic,
      difficulty,
      audience,
      imageUrl: await this.generateCourseImage(topic, difficulty, audience),
      modules,
      createdAt: new Date(),
      estimatedDuration: this.calculateTotalDuration(modules),
      userId, // Assign the userId
    }
  }

  // ────────────────────────────────────────────────────────────
  // MODULE / LESSON GENERATION
  // ────────────────────────────────────────────────────────────
  private static async generateModules(
    topic: string,
    difficulty: "beginner" | "intermediate" | "advanced",
    audience: string,
  ): Promise<Module[]> {
    const structure = this.getTopicSpecificModules(topic)
    const modules: Module[] = []

    for (let i = 0; i < structure.length; i++) {
      const m = structure[i]
      const lessons = await this.generateLessons(topic, m, i + 1, difficulty, audience)

      modules.push({
        id: `module-${i + 1}`,
        title: `Module ${i + 1}: ${m.title}`,
        description: m.description,
        lessons,
        duration: this.calculateModuleDuration(lessons),
      })
    }
    return modules
  }

  private static async generateLessons(
    topic: string,
    moduleInfo: { title: string; description: string; lessons: string[] },
    moduleNumber: number,
    difficulty: "beginner" | "intermediate" | "advanced",
    audience: string,
  ): Promise<Lesson[]> {
    return moduleInfo.lessons.map((lesson, idx) => {
      const id = `lesson-${moduleNumber}-${idx + 1}`

      return {
        id,
        title: lesson,
        content: this.generateLessonContent(topic, lesson, difficulty, audience),
        duration: "25 min",
        videoUrl: this.generateVideoUrl(topic, lesson, difficulty, audience),
        videoTitle: `${lesson} – Tutorial`,
        videoDescription: this.generateVideoDescription(topic, lesson, difficulty, audience),
        keyPoints: this.generateKeyPoints(topic, lesson, difficulty, audience),
        questions: this.generateQuestions(topic, lesson, difficulty, audience),
      }
    })
  }

  // ────────────────────────────────────────────────────────────
  // CONTENT HELPERS
  // ────────────────────────────────────────────
  private static generateLessonContent(
    topic: string,
    lessonTitle: string,
    difficulty: "beginner" | "intermediate" | "advanced",
    audience: string,
  ): string {
    const topicLower = topic.toLowerCase()
    const titleLower = lessonTitle.toLowerCase()

    // Java-specific content
    if (topicLower.includes("java")) {
      if (titleLower.includes("what is java")) {
        return `
# What is Java?

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand the definition and core principles of Java
- Know why Java is popular and its main applications
- Recognize the Java ecosystem and its components
- Understand the basics of Java compilation and execution

## ☕ Definition of Java

**Java** is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers "write once, run anywhere" (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.

## ✨ Key Principles of Java

1.  **Simple**: Java was designed to be easy to learn and use.
2.  **Object-Oriented**: Everything in Java is an object (with a few exceptions for primitive types).
3.  **Platform Independent**: Write once, run anywhere. Achieved through the Java Virtual Machine (JVM).
4.  **Secure**: Features like automatic garbage collection and exception handling enhance security.
5.  **Robust**: Strong memory management and error handling.
6.  **Multithreaded**: Supports concurrent execution of multiple parts of a program.
7.  **High Performance**: Achieved through JIT (Just-In-Time) compilers.
8.  **Distributed**: Designed for distributed environments of the internet.

## 🚀 Why Java is Popular

-   **Large Community**: A vast and active developer community.
-   **Rich API**: Extensive standard library for various tasks.
-   **Powerful Tools**: Mature IDEs (Eclipse, IntelliJ IDEA, NetBeans) and build tools (Maven, Gradle).
-   **Scalability**: Used in large-scale enterprise applications.
-   **Android Development**: The primary language for native Android apps.
-   **Big Data**: Integral to technologies like Hadoop and Spark.

## 🌍 Java Ecosystem

-   **JDK (Java Development Kit)**: Contains tools for developing, debugging, and monitoring Java applications. Includes JRE and JVM.
-   **JRE (Java Runtime Environment)**: Provides the libraries and JVM needed to run Java applications.
-   **JVM (Java Virtual Machine)**: An abstract machine that enables a computer to run Java programs. It converts Java bytecode into machine-specific code.
-   **Java SE (Standard Edition)**: For desktop and basic applications.
-   **Java EE (Enterprise Edition)**: For large-scale, distributed, multi-tier applications.
-   **Java ME (Micro Edition)**: For mobile and embedded devices.

## ⚙️ Java Compilation and Execution

1.  **Source Code**: You write Java code in \`.java\` files (e.g., \`HelloWorld.java\`).
2.  **Compilation**: The Java compiler (\`javac\`) compiles the source code into bytecode (\`.class\` files).
3.  **Execution**: The JVM loads the \`.class\` files and interprets or JIT-compiles the bytecode into machine code, which is then executed by the operating system.

This "write once, run anywhere" capability is a cornerstone of Java's enduring popularity.

## 📝 Key Takeaways

1.  Java is a platform-independent, object-oriented programming language.
2.  Its core principles include simplicity, security, robustness, and multithreading.
3.  Java's popularity stems from its large community, rich API, and wide range of applications.
4.  The Java ecosystem includes JDK, JRE, and JVM, which facilitate development and execution.
5.  Java code is compiled into bytecode and then executed by the JVM, enabling cross-platform compatibility.
        `.trim()
      }
      if (titleLower.includes("object-oriented programming")) {
        return `
# Object-Oriented Programming (OOP) in Java

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand the core concepts of Object-Oriented Programming (OOP)
- Learn about Classes and Objects in Java
- Grasp the principles of Inheritance and Polymorphism
- Comprehend Abstraction and Encapsulation

## 🧩 Core Concepts of OOP

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code: data in the form of fields (attributes or properties), and code in the form of procedures (methods).

The four main pillars of OOP are:
1.  **Encapsulation**
2.  **Abstraction**
3.  **Inheritance**
4.  **Polymorphism**

## 📦 Classes and Objects

-   **Class**: A blueprint or a template for creating objects. It defines the properties (attributes) and behaviors (methods) that objects of that class will have.
    \`\`\`java
    public class Car {
        String make;
        String model;
        int year;

        public void start() {
            System.out.println("Car started.");
        }
    }
    \`\`\`
-   **Object**: An instance of a class. When a class is defined, no memory is allocated. Memory is allocated only when an object is created.
    \`\`\`java
    Car myCar = new Car(); // Creating an object of Car class
    myCar.make = "Toyota";
    myCar.model = "Camry";
    myCar.year = 2020;
    myCar.start();
    \`\`\`

## 🧬 Inheritance

**Inheritance** is a mechanism in which one object acquires all the properties and behaviors of a parent object. It represents the "is-a" relationship. The class that inherits is called the subclass (child), and the class from which it inherits is called the superclass (parent).

\`\`\`java
class Vehicle {
    void drive() {
        System.out.println("Vehicle is driving.");
    }
}

class Car extends Vehicle { // Car inherits from Vehicle
    void honk() {
        System.out.println("Car is honking.");
    }
}

// Usage
Car myCar = new Car();
myCar.drive(); // Inherited method
myCar.honk();
\`\`\`

## 🎭 Polymorphism

**Polymorphism** means "many forms". It allows objects of different classes to be treated as objects of a common superclass. In Java, polymorphism is achieved through method overloading (compile-time) and method overriding (run-time).

-   **Method Overloading**: Multiple methods with the same name but different parameters within the same class.
-   **Method Overriding**: A subclass provides a specific implementation for a method that is already defined in its superclass.

\`\`\`java
class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows");
    }
}

// Usage
Animal myAnimal = new Dog();
myAnimal.makeSound(); // Output: Dog barks

myAnimal = new Cat();
myAnimal.makeSound(); // Output: Cat meows
\`\`\`

## 🔒 Encapsulation

**Encapsulation** is the bundling of data (attributes) and methods that operate on the data into a single unit (class), and restricting direct access to some of an object's components. This is typically done using access modifiers (private, public, protected).

\`\`\`java
public class BankAccount {
    private double balance; // Data is private

    public double getBalance() { // Public method to access data
        return balance;
    }

    public void deposit(double amount) { // Public method to modify data
        if (amount > 0) {
            this.balance += amount;
        }
    }
}
\`\`\`

## 👁️ Abstraction

**Abstraction** is the concept of hiding the complex implementation details and showing only the necessary or essential features of an object. In Java, abstraction is achieved using abstract classes and interfaces.

-   **Abstract Class**: A class that cannot be instantiated and may contain abstract methods (methods without implementation).
-   **Interface**: A blueprint of a class. It has static constants and abstract methods.

\`\`\`java
// Abstract Class
abstract class Shape {
    abstract double area(); // Abstract method

    void display() {
        System.out.println("This is a shape.");
    }
}

class Circle extends Shape {
    double radius;
    public Circle(double radius) { this.radius = radius; }
    @Override
    double area() { return Math.PI * radius * radius; }
}

// Interface
interface Drawable {
    void draw();
}

class Rectangle implements Drawable {
    @Override
    public void draw() {
        System.println("Drawing a rectangle.");
    }
}
\`\`\`

## 📝 Key Takeaways

1.  OOP is a paradigm based on objects, promoting modularity and reusability.
2.  **Classes** are blueprints, and **Objects** are instances of those blueprints.
3.  **Inheritance** allows a subclass to acquire properties and behaviors from a superclass ("is-a" relationship).
4.  **Polymorphism** enables objects to take on many forms, allowing methods to behave differently based on the object type.
5.  **Encapsulation** bundles data and methods, restricting direct access to data for security and integrity.
6.  **Abstraction** hides complex details, showing only essential features, achieved via abstract classes and interfaces.
        `.trim()
      }
    }

    // AI-specific content
    if (topicLower === "artificial intelligence" || topicLower === "ai") {
      if (titleLower.includes("what is artificial intelligence")) {
        if (difficulty === "beginner") {
          return `
# What is Artificial Intelligence? (Beginner)

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand the basic definition of AI
- Recognize simple examples of AI in daily life
- Know why AI is becoming important

## 🤖 Definition of Artificial Intelligence

**Artificial Intelligence (AI)** is about making computers smart, so they can do things that usually require human thinking. Think of it as teaching a computer to "think" and "learn" like us.

AI systems can help with tasks like:
- **Seeing**: Understanding pictures and videos (like your phone recognizing faces).
- **Hearing**: Understanding what you say (like voice assistants).
- **Deciding**: Making choices based on information (like a game character choosing its next move).

## ✨ Simple Examples of AI

You probably use AI every day without even realizing it!
- **Voice Assistants**: Siri, Google Assistant, Alexa. When you ask them a question, AI helps them understand and respond.
- **Recommendations**: When Netflix suggests a movie or Spotify suggests a song, that's AI learning what you like.
- **Spam Filters**: Your email uses AI to figure out which emails are junk and which are important.
- **GPS Navigation**: Apps like Google Maps use AI to find the best route and predict traffic.

## 🚀 Why is AI Important?

AI is important because it can help us:
- **Save Time**: By automating repetitive tasks.
- **Make Things Easier**: Like getting instant answers from a voice assistant.
- **Solve Big Problems**: In areas like medicine or climate change.

## ⚠️ What AI is NOT (Yet)

It's important to know that today's AI is "narrow." This means it's very good at one specific task (like playing chess or translating languages), but it can't do everything a human can. It doesn't have common sense or feelings.

## 📝 Key Takeaways

1.  AI teaches computers to think and learn like humans.
2.  You use AI daily in apps like voice assistants and recommendation systems.
3.  AI helps save time and solve problems.
4.  Current AI is "narrow" – good at specific tasks, not general human intelligence.
        `.trim()
        } else if (difficulty === "intermediate") {
          return `
# What is Artificial Intelligence? (Intermediate)

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand the definition and core concepts of Artificial Intelligence
- Know the different types of AI (Narrow, General, Super) and their applications
- Recognize AI in everyday life and business
- Understand the potential and limitations of current AI technology

## 🤖 Definition of Artificial Intelligence

**Artificial Intelligence (AI)** is the simulation of human intelligence in machines that are programmed to think, learn, and make decisions like humans. AI systems can perform tasks that typically require human intelligence, such as:

- **Visual perception** - Understanding and interpreting images and videos
- **Speech recognition** - Converting spoken language into text
- **Decision-making** - Making choices based on data and rules
- **Language translation** - Converting text from one language to another
- **Problem-solving** - Finding solutions to complex challenges

## 🧠 How AI Works

AI systems work by:

1.  **Data Input**: Receiving large amounts of data (text, images, numbers, etc.)
2.  **Pattern Recognition**: Finding patterns and relationships in the data
3.  **Learning**: Improving performance through experience and feedback
4.  **Decision Making**: Making predictions or decisions based on learned patterns
5.  **Output**: Providing results, recommendations, or actions

## 🔍 Types of Artificial Intelligence

### Narrow AI (Weak AI)
-   **Definition**: AI designed for specific tasks
-   **Examples**: Siri, Google Translate, Netflix recommendations
-   **Current Status**: This is what we have today
-   **Capabilities**: Excellent at specific tasks but cannot transfer knowledge to other areas

### General AI (Strong AI)
-   **Definition**: AI with human-level intelligence across all domains
-   **Status**: Theoretical - doesn't exist yet
-   **Goal**: Machines that can understand, learn, and apply intelligence like humans
-   **Timeline**: Experts debate if/when this will be achieved

### Super AI
-   **Definition**: AI that surpasses human intelligence in all areas
-   **Status**: Hypothetical future possibility
-   **Implications**: Could revolutionize or pose risks to humanity
-   **Considerations**: Subject of ongoing ethical and safety research

## 🌟 Real-World Applications

### In Your Daily Life
-   **Smartphones**: Voice assistants, photo organization, predictive text
-   **Entertainment**: Netflix/Spotify recommendations, gaming AI
-   **Transportation**: GPS navigation, ride-sharing apps
-   **Shopping**: Product recommendations, price comparisons
-   **Social Media**: News feed algorithms, content moderation

### In Business and Industry
-   **Healthcare**: Medical diagnosis, drug discovery, personalized treatment
-   **Finance**: Fraud detection, algorithmic trading, credit scoring
-   **Manufacturing**: Quality control, predictive maintenance, robotics
-   **Customer Service**: Chatbots, automated support systems
-   **Marketing**: Targeted advertising, customer segmentation

## 💡 Key Benefits of AI

-   **Efficiency**: Automates repetitive tasks and processes
-   **Accuracy**: Reduces human error in data analysis and decision-making
-   **Speed**: Processes information much faster than humans
-   **Availability**: Works 24/7 without breaks or fatigue
-   **Scalability**: Can handle massive amounts of data and users
-   **Cost Reduction**: Reduces labor costs and operational expenses

## ⚠️ Current Limitations

-   **Lack of Common Sense**: AI doesn't understand context like humans
-   **Data Dependency**: Requires large amounts of quality data to function
-   **Bias Issues**: Can perpetuate or amplify human biases present in training data
-   **Explainability**: Often difficult to understand how AI makes decisions
-   **Creativity Limits**: Struggles with truly creative or innovative tasks
-   **Ethical Concerns**: Raises questions about privacy, job displacement, and control

## 📝 Key Takeaways

1.  AI is the simulation of human intelligence in machines
2.  Current AI is "narrow" - good at specific tasks but not general intelligence
3.  AI is already part of your daily life through apps and services you use
4.  AI offers significant benefits but also has important limitations
5.  Understanding AI is crucial for navigating the modern digital world
6.  AI will continue to evolve and impact society in profound ways
        `.trim()
        } else if (difficulty === "advanced") {
          return `
# What is Artificial Intelligence? (Advanced)

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Deeply understand the theoretical underpinnings of AI paradigms
- Differentiate between symbolic AI, connectionist AI, and statistical AI
- Analyze the philosophical implications of AGI and Superintelligence
- Evaluate the current state-of-the-art in AI research and its limitations
- Discuss the ethical frameworks and governance challenges in AI development

## 🧠 Theoretical Foundations and Paradigms

AI research has evolved through several paradigms:

### 1. Symbolic AI (Good Old-Fashioned AI - GOFAI)
-   **Concept**: Based on explicit knowledge representation and logical reasoning.
-   **Approach**: Programs manipulate symbols representing real-world entities and their relationships.
-   **Techniques**: Expert systems, logic programming (e.g., Prolog), search algorithms (e.g., A*).
-   **Limitations**: Brittleness, difficulty with uncertainty, knowledge acquisition bottleneck.

### 2. Connectionist AI (Neural Networks)
-   **Concept**: Inspired by the structure and function of the human brain.
-   **Approach**: Systems learn patterns from data through interconnected nodes (neurons) and weighted connections.
-   **Techniques**: Perceptrons, Multi-Layer Perceptrons (MLPs), backpropagation.
-   **Evolution**: Led to Deep Learning with more layers and complex architectures.

### 3. Statistical AI / Machine Learning
-   **Concept**: Focuses on building models that learn from data to make predictions or decisions.
-   **Approach**: Uses statistical methods and probability theory to find patterns and relationships.
-   **Techniques**: Regression, classification, clustering, Bayesian networks, Hidden Markov Models.
-   **Dominance**: Currently the most prevalent paradigm due to data availability and computational power.

## 📈 AI Capabilities Spectrum

-   **Artificial Narrow Intelligence (ANI)**: Task-specific AI. All current deployed AI systems fall into this category (e.g., AlphaGo, GPT-4, self-driving car systems). They excel at their specific domain but lack general cognitive abilities.
-   **Artificial General Intelligence (AGI)**: Hypothetical AI with human-level cognitive abilities across a wide range of tasks, including reasoning, problem-solving, learning from experience, and understanding complex ideas. This remains a significant research challenge.
-   **Artificial Superintelligence (ASI)**: Hypothetical AI that surpasses human intelligence in virtually every field, including scientific creativity, general wisdom, and social skills. The implications of ASI are a major topic in AI safety and existential risk research.

## 🚧 Current State-of-the-Art and Limitations

While AI has made remarkable progress (e.g., large language models, advanced computer vision), fundamental limitations persist:

-   **Common Sense Reasoning**: AI struggles with intuitive understanding of the physical and social world.
-   **Causality**: Models often identify correlations but lack true causal understanding.
-   **Robustness and Generalization**: Performance can degrade significantly on out-of-distribution data.
-   **Explainability (XAI)**: Many complex models (e.g., deep neural networks) are "black boxes," making their decision-making processes opaque.
-   **Data Efficiency**: Requires vast amounts of labeled data, unlike human learning.
-   **Ethical Alignment**: Ensuring AI systems align with human values and avoid bias remains a complex challenge.

## ⚖️ Ethical Considerations and Governance

The rapid advancement of AI necessitates robust ethical frameworks and governance:

-   **Bias and Fairness**: AI models can perpetuate or amplify societal biases present in training data.
-   **Privacy and Data Security**: Large-scale data collection for AI raises significant privacy concerns.
-   **Accountability and Responsibility**: Who is responsible when an AI system makes a harmful decision?
-   **Transparency and Explainability (XAI)**: The need to understand how AI systems arrive at their conclusions.
-   **Job Displacement**: The potential for AI to automate jobs and impact the workforce.
-   **Autonomous Weapons Systems**: The ethical implications of AI-controlled lethal weapons.

International bodies and governments are actively working on AI regulations and ethical guidelines (e.g., EU AI Act, UNESCO Recommendation on the Ethics of AI).

## 🚀 Future Directions

Key research areas include:
-   **AGI Research**: Developing more general and adaptable AI systems.
-   **Neuro-symbolic AI**: Combining the strengths of symbolic reasoning with neural networks.
-   **Reinforcement Learning**: Advancements in agents learning through interaction.
-   **Federated Learning**: Privacy-preserving distributed machine learning.
-   **AI Safety and Alignment**: Ensuring AI development benefits humanity.

## 📝 Key Takeaways

1.  AI has evolved through symbolic, connectionist, and statistical paradigms.
2.  ANI is current AI; AGI and ASI are hypothetical future states.
3.  Significant limitations include lack of common sense, causality, and explainability.
4.  Ethical considerations like bias, privacy, and accountability are paramount.
5.  Future research focuses on AGI, neuro-symbolic approaches, and AI safety.
6.  Effective AI governance is crucial for responsible development and deployment.
        `.trim()
        }
      }
    }

    // Machine Learning specific content
    if (topicLower === "machine learning" || topicLower === "ml") {
      if (titleLower.includes("introduction to machine learning")) {
        if (difficulty === "beginner") {
          return `
# Introduction to Machine Learning (Beginner)

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand what Machine Learning (ML) is in simple terms
- Know the basic idea of how ML learns from data
- Recognize common examples of ML in everyday life

## 🤖 What is Machine Learning?

**Machine Learning (ML)** is a way to teach computers to learn from data without being told exactly what to do. Instead of giving the computer step-by-step instructions for every task, we give it lots of examples, and it figures out the rules itself.

Think of it like teaching a child:
- **Traditional Programming**: You tell the child, "If it's raining, take an umbrella." (Explicit rule)
- **Machine Learning**: You show the child many pictures of "rainy days" and "sunny days" and tell them which is which. Eventually, the child learns to recognize a rainy day and knows to take an umbrella, even if they haven't seen that exact rainy day before.

## 📊 How ML Learns

ML models learn by:
1.  **Getting Data**: They look at many examples (like pictures, numbers, or text).
2.  **Finding Patterns**: They find hidden connections and rules in the data.
3.  **Making Predictions**: Once they learn, they can make guesses or decisions about new data.

## ✨ Everyday Examples of ML

-   **Spam Detection**: Your email learns to put junk mail in the spam folder.
-   **Product Recommendations**: Online stores suggest things you might like based on what you've bought before.
-   **Face Recognition**: Your phone can unlock by recognizing your face.
-   **Voice Recognition**: When you talk to Siri or Google Assistant, ML helps them understand you.

## 📝 Key Takeaways

1.  ML teaches computers to learn from examples, not just strict rules.
2.  Computers find patterns in data to make predictions.
3.  ML is used in spam filters, recommendations, and face recognition.
4.  It's a powerful way for computers to get smarter over time.
        `.trim()
        } else if (difficulty === "intermediate") {
          return `
# Introduction to Machine Learning (Intermediate)

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand what machine learning is and how it differs from traditional programming
- Know the main types of machine learning: Supervised, Unsupervised, and Reinforcement Learning
- Recognize machine learning applications in everyday life and business
- Understand the basic machine learning workflow

## 🤖 What is Machine Learning?

**Machine Learning (ML)** is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed for every task. Instead of following pre-written instructions, ML systems learn patterns from data and make predictions or decisions.

### Traditional Programming vs Machine Learning

**Traditional Programming:**
- Input: Data + Program → Output: Results
- Programmer writes specific rules and logic
- Computer follows exact instructions

**Machine Learning:**
- Input: Data + Desired Output → Output: Program (Model)
- Computer finds patterns and creates its own rules
- System improves with more data

## 📊 Types of Machine Learning

### 1. Supervised Learning
**Definition**: Learning with labeled examples (input-output pairs)

**How it works**:
- Train on data where the correct answer is known
- Learn to map inputs to correct outputs
- Make predictions on new, unseen data

**Examples**:
- **Email Spam Detection**: Learn from emails labeled as "spam" or "not spam"
- **Medical Diagnosis**: Learn from symptoms and known diagnoses
- **Price Prediction**: Learn from historical data to predict house prices

**Common Algorithms**:
- Linear Regression
- Decision Trees
- Neural Networks
- Support Vector Machines

### 2. Unsupervised Learning
**Definition**: Finding hidden patterns in data without labeled examples

**How it works**:
- Analyze data to discover hidden structures
- No "correct answers" provided during training
- Identify patterns, groups, or anomalies

**Examples**:
- **Customer Segmentation**: Group customers by purchasing behavior
- **Recommendation Systems**: Find similar products or users
- **Anomaly Detection**: Identify unusual patterns in network traffic

**Common Algorithms**:
- K-Means Clustering
- Principal Component Analysis (PCA)
- Association Rules

### 3. Reinforcement Learning
**Definition**: Learning through interaction and feedback

**How it works**:
- Agent takes actions in an environment
- Receives rewards or penalties for actions
- Learns to maximize rewards over time

**Examples**:
- **Game Playing**: AlphaGo, chess programs
- **Autonomous Vehicles**: Learning to drive safely
- **Trading Systems**: Learning optimal investment strategies

## 🔄 The Machine Learning Workflow

### 1. Problem Definition
- Identify what you want to predict or classify
- Determine if it's a supervised, unsupervised, or reinforcement learning problem
- Define success metrics

### 2. Data Collection
- Gather relevant data for your problem
- Ensure data quality and completeness
- Consider data privacy and ethical implications

### 3. Data Preparation
- Clean and preprocess the data
- Handle missing values and outliers
- Transform data into suitable format for algorithms

### 4. Model Selection
- Choose appropriate algorithm(s) for your problem
- Consider factors like data size, complexity, and interpretability
- Start with simple models before trying complex ones

### 5. Training
- Feed data to the algorithm to learn patterns
- Adjust model parameters for better performance
- Monitor for overfitting or underfitting

### 6. Evaluation
- Test model performance on unseen data
- Use appropriate metrics (accuracy, precision, recall, etc.)
- Compare different models and approaches

### 7. Deployment
- Integrate model into production systems
- Monitor performance in real-world conditions
- Update model as needed with new data

## 📝 Key Takeaways

1.  Machine learning enables computers to learn from data without explicit programming
2.  Three main types: supervised, unsupervised, and reinforcement learning
3.  ML follows a systematic workflow from problem definition to deployment
4.  Data quality and quantity are crucial for success
5.  ML is already transforming many industries and aspects of daily life
6.  Getting started requires programming skills, statistical knowledge, and practice
7.  Understanding limitations and challenges is as important as knowing capabilities
        `.trim()
        } else if (difficulty === "advanced") {
          return `
# Introduction to Machine Learning (Advanced)

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Critically analyze the mathematical foundations and algorithmic complexities of core ML paradigms.
- Evaluate advanced topics such as bias-variance trade-off, regularization techniques, and ensemble methods.
- Understand the nuances of model interpretability, fairness, and ethical implications in real-world ML systems.
- Design and implement robust ML pipelines, including data preprocessing, feature engineering, and deployment strategies.
- Discuss the latest research trends and open problems in the field of machine learning.

## 🤖 Formal Definition and Paradigms

**Machine Learning (ML)** is a field of artificial intelligence that uses statistical techniques to give computer systems the ability to "learn" from data, without being explicitly programmed. This learning process involves identifying patterns in data and making data-driven predictions or decisions.

### ML vs. Traditional Programming (Formal)

**Traditional Programming:**
-   **Model**: Explicitly defined algorithms and rules.
-   **Input**: Data, Program (Rules)
-   **Output**: Results
-   **Paradigm**: Deterministic, rule-based.

**Machine Learning:**
-   **Model**: Learned from data (a "program" derived from data).
-   **Input**: Data, Desired Output (Labels/Feedback)
-   **Output**: Program (Model)
-   **Paradigm**: Probabilistic, data-driven, adaptive.

## 📊 Advanced ML Paradigms

### 1. Supervised Learning (Deep Dive)
-   **Objective**: Learn a mapping function from input variables (X) to an output variable (Y) given labeled examples.
-   **Mathematical Basis**: Regression (e.g., Ordinary Least Squares, Ridge, Lasso), Classification (e.g., Logistic Regression, SVM, Decision Trees, Random Forests, Gradient Boosting Machines).
-   **Key Concepts**: Loss functions (MSE, Cross-Entropy), Gradient Descent optimization, Regularization (L1, L2), Bias-Variance Trade-off.
-   **Evaluation Metrics**: Precision, Recall, F1-score, ROC-AUC, R-squared, RMSE.

### 2. Unsupervised Learning (Deep Dive)
-   **Objective**: Discover hidden patterns or intrinsic structures in input data without labeled responses.
-   **Mathematical Basis**: Dimensionality Reduction (e.g., PCA, t-SNE, Autoencoders), Clustering (e.g., K-Means, DBSCAN, Hierarchical Clustering), Association Rule Mining.
-   **Key Concepts**: Feature extraction, manifold learning, density estimation, anomaly detection.
-   **Evaluation Metrics**: Silhouette Score, Davies-Bouldin Index (for clustering), reconstruction error (for dimensionality reduction).

### 3. Reinforcement Learning (Deep Dive)
-   **Objective**: An agent learns to make a sequence of decisions in an environment to maximize a cumulative reward.
-   **Components**: Agent, Environment, State, Action, Reward, Policy, Value Function.
-   **Algorithms**: Q-Learning, SARSA, Deep Q-Networks (DQN), Policy Gradients (REINFORCE, Actor-Critic methods like A2C/A3C, PPO).
-   **Challenges**: Exploration-exploitation dilemma, credit assignment problem, sample efficiency.

## 🔄 The ML Engineering Workflow (MLOps)

Beyond the basic workflow, MLOps emphasizes continuous integration, delivery, and deployment for ML systems:

1.  **Data Engineering**: Data ingestion, cleaning, transformation, versioning (e.g., DVC).
2.  **Feature Engineering**: Creating new features from raw data to improve model performance.
3.  **Model Development**: Algorithm selection, hyperparameter tuning, cross-validation.
4.  **Model Training & Experiment Tracking**: Distributed training, logging metrics and parameters (e.g., MLflow, Weights & Biases).
5.  **Model Evaluation & Validation**: Robust testing, A/B testing, fairness audits.
6.  **Model Deployment**: Containerization (Docker), orchestration (Kubernetes), serverless functions.
7.  **Model Monitoring**: Performance drift, data drift, concept drift, explainability monitoring.
8.  **Model Retraining & Versioning**: Automated retraining pipelines, model registry.

## 💡 Advanced Concepts and Challenges

### Bias and Fairness in ML
-   **Sources of Bias**: Data collection bias, algorithmic bias, human bias in labeling.
-   **Mitigation Strategies**: Data re-sampling, algorithmic debiasing, fairness-aware learning.
-   **Fairness Metrics**: Demographic parity, equalized odds, individual fairness.

### Interpretability and Explainability (XAI)
-   **Why XAI?**: Trust, accountability, debugging, scientific discovery.
-   **Techniques**:
    -   **Local Explanations**: LIME, SHAP (explaining individual predictions).
    -   **Global Explanations**: Partial Dependence Plots (PDP), Individual Conditional Expectation (ICE) plots.
    -   **Model-Specific**: Decision tree visualization, attention mechanisms in neural networks.

### Scalability and Performance
-   **Distributed Computing**: Spark, Dask for large datasets.
-   **Hardware Acceleration**: GPUs, TPUs for deep learning.
-   **Model Compression**: Pruning, quantization, knowledge distillation.

### Ethical and Societal Impact
-   **Privacy-Preserving ML**: Federated Learning, Differential Privacy, Homomorphic Encryption.
-   **Regulatory Landscape**: GDPR, CCPA, emerging AI regulations (e.g., EU AI Act).
-   **Responsible AI**: Principles for developing AI that is beneficial, safe, and fair.

## 🚀 Future Trends and Open Problems

-   **Foundation Models / Large Language Models (LLMs)**: Their capabilities, limitations, and fine-tuning.
-   **Generative AI**: Diffusion models, GANs for content creation.
-   **Causal Inference**: Moving beyond correlation to understanding cause-and-effect.
-   **Continual Learning / Lifelong Learning**: Models that can learn new tasks without forgetting old ones.
-   **Meta-Learning**: Learning to learn.
-   **Quantum Machine Learning**: Potential for quantum computing in ML.

## 📝 Key Takeaways

1.  ML is a data-driven paradigm distinct from traditional programming, with advanced mathematical underpinnings.
2.  Supervised, Unsupervised, and Reinforcement Learning each have complex algorithms and specific use cases.
3.  MLOps is crucial for deploying and maintaining robust ML systems in production.
4.  Addressing bias, ensuring fairness, and providing interpretability are critical challenges in modern ML.
5.  Concept drift requires continuous monitoring and retraining strategies.
6.  Current trends include LLMs, Generative AI, and causal inference.
        `.trim()
        }
      }
    }

    // Web Development content
    if (
      topicLower.includes("web") ||
      topicLower.includes("html") ||
      topicLower.includes("css") ||
      topicLower.includes("javascript")
    ) {
      if (titleLower.includes("what is web development")) {
        return `
# What is Web Development?

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand what web development is and its importance
- Know the difference between frontend and backend development
- Recognize the technologies used in web development
- Understand the web development process and career opportunities

## 🌐 Definition of Web Development

**Web Development** is the process of creating websites and web applications that run on the internet or an intranet. It involves designing, building, and maintaining websites using various programming languages, frameworks, and tools.

Web development encompasses everything from creating simple static web pages to complex web applications, e-commerce sites, and social media platforms.

## 🏗️ Types of Web Development

### Frontend Development (Client-Side)
**What it is**: The part of web development that users see and interact with directly in their web browser.

**Responsibilities**:
- User interface (UI) design and implementation
- User experience (UX) optimization
- Responsive design for different devices
- Interactive elements and animations
- Performance optimization

**Key Technologies**:
- **HTML** (HyperText Markup Language): Structure and content
- **CSS** (Cascading Style Sheets): Styling and layout
- **JavaScript**: Interactivity and dynamic behavior
- **Frameworks**: React, Vue.js, Angular
- **Tools**: Webpack, Sass, TypeScript

### Backend Development (Server-Side)
**What it is**: The behind-the-scenes functionality that powers websites and handles server logic.

**Responsibilities**:
- Server logic and architecture
- Database design and management
- API development and integration
- Security and authentication
- Performance and scalability

**Key Technologies**:
- **Programming Languages**: Python, JavaScript (Node.js), Java, PHP, Ruby, C#
- **Databases**: MySQL, PostgreSQL, MongoDB, Redis
- **Frameworks**: Express.js, Django, Spring, Laravel
- **Cloud Services**: AWS, Google Cloud, Microsoft Azure

### Full-Stack Development
**What it is**: Combining both frontend and backend development skills.

**Full-Stack Developers**:
- Work on both client and server sides
- Understand the complete web development process
- Can build entire web applications independently
- Bridge the gap between frontend and backend teams

## 🔧 Core Web Technologies

### HTML (HyperText Markup Language)
- **Purpose**: Defines the structure and content of web pages
- **Elements**: Headings, paragraphs, links, images, forms
- **Example**: \`<h1>Welcome to My Website</h1>\`

### CSS (Cascading Style Sheets)
- **Purpose**: Controls the visual appearance and layout
- **Features**: Colors, fonts, spacing, responsive design
- **Example**: \`h1 { color: blue; font-size: 24px; }\`

### JavaScript
- **Purpose**: Adds interactivity and dynamic behavior
- **Capabilities**: Form validation, animations, API calls
- **Example**: \`document.getElementById('button').onclick = function() { alert('Hello!'); }\`

## 🌟 Real-World Applications

### Business Websites
- **Corporate Sites**: Company information and branding
- **E-commerce**: Online stores and shopping platforms
- **Portfolios**: Showcasing work and services
- **Blogs**: Content publishing and management

### Web Applications
- **Social Media**: Facebook, Twitter, Instagram
- **Productivity Tools**: Google Workspace, Slack, Trello
- **Entertainment**: Netflix, YouTube, Spotify
- **Financial Services**: Online banking, trading platforms

### Specialized Applications
- **Educational Platforms**: Online learning systems
- **Healthcare**: Patient portals and telemedicine
- **Government**: Public services and information
- **Non-Profit**: Fundraising and awareness campaigns

## 🚀 The Web Development Process

### 1. Planning and Analysis
- **Requirements Gathering**: Understanding client needs
- **Target Audience**: Identifying users and their needs
- **Competitor Analysis**: Researching similar websites
- **Project Scope**: Defining features and timeline

### 2. Design and Wireframing
- **User Experience (UX)**: Planning user journeys
- **User Interface (UI)**: Visual design and layout
- **Wireframes**: Basic structure and navigation
- **Prototypes**: Interactive mockups

### 3. Development
- **Frontend Development**: Building the user interface
- **Backend Development**: Creating server-side functionality
- **Database Design**: Structuring data storage
- **Integration**: Connecting all components

### 4. Testing and Quality Assurance
- **Functionality Testing**: Ensuring features work correctly
- **Cross-Browser Testing**: Compatibility across browsers
- **Responsive Testing**: Performance on different devices
- **Performance Testing**: Speed and optimization
- **Security Testing**: Protecting against vulnerabilities

### 5. Deployment and Launch
- **Hosting Setup**: Choosing and configuring servers
- **Domain Configuration**: Setting up web addresses
- **SSL Certificates**: Ensuring secure connections
- **Go-Live**: Making the website publicly available

### 6. Maintenance and Updates
- **Content Updates**: Keeping information current
- **Security Patches**: Protecting against threats
- **Performance Monitoring**: Ensuring optimal speed
- **Feature Enhancements**: Adding new functionality

## 💼 Career Opportunities

### Job Roles
- **Frontend Developer**: Focus on user interface and experience
- **Backend Developer**: Specialize in server-side development
- **Full-Stack Developer**: Work on both frontend and backend
- **Web Designer**: Focus on visual design and user experience
- **DevOps Engineer**: Handle deployment and infrastructure
- **Technical Lead**: Guide development teams and architecture

### Industries
- **Technology**: Software companies and startups
- **E-commerce**: Online retail and marketplaces
- **Media**: News, entertainment, and publishing
- **Finance**: Banking and financial services
- **Healthcare**: Medical and pharmaceutical companies
- **Education**: Schools and online learning platforms

### Freelancing and Entrepreneurship
- **Freelance Development**: Working with multiple clients
- **Agency Work**: Joining web development agencies
- **Product Development**: Creating your own web applications
- **Consulting**: Advising businesses on web strategy

## 📈 Industry Trends and Future

### Current Trends
- **Mobile-First Design**: Prioritizing mobile user experience
- **Progressive Web Apps**: Web apps that feel like native apps
- **Single Page Applications**: Faster, more interactive websites
- **Jamstack Architecture**: Modern web development approach
- **Serverless Computing**: Simplified backend infrastructure

### Emerging Technologies
- **Artificial Intelligence**: AI-powered web features
- **Voice Interfaces**: Voice-controlled web interactions
- **Augmented Reality**: AR experiences in web browsers
- **Blockchain**: Decentralized web applications
- **Internet of Things**: Connected device interfaces

### 🎓 Skills for Success

### Technical Skills
- **Programming Languages**: HTML, CSS, JavaScript, and backend languages
- **Frameworks and Libraries**: React, Angular, Vue.js, Node.js
- **Version Control**: Git and GitHub
- **Database Management**: SQL and NoSQL databases
- **Testing**: Unit testing and integration testing

### Soft Skills
- **Problem-Solving**: Debugging and troubleshooting
- **Communication**: Working with clients and teams
- **Adaptability and Continuous Learning**: Staying updated with new technologies
- **Attention to Detail**: Ensuring quality and accuracy
- **Project Management**: Planning and organizing work

## 📝 Key Takeaways

1.  Web development creates websites and applications that run on the internet
2.  Frontend focuses on user interface, backend handles server-side logic
3.  Core technologies include HTML, CSS, and JavaScript
4.  The development process involves planning, design, development, testing, and deployment
5.  Career opportunities exist across many industries and roles
6.  Success requires both technical skills and continuous learning
7.  The field is constantly evolving with new technologies and trends
        `.trim()
      }
    }

    // Generic fallback for any other topic ─ now includes difficulty and audience
    let content = `
# ${lessonTitle}

## Overview
This lesson introduces ${lessonTitle.toLowerCase()} in the context of ${topic}, tailored for ${difficulty} ${audience}.
`
    if (difficulty === "beginner") {
      content += `This section will cover the fundamental concepts and provide a gentle introduction to get you started.`
    } else if (difficulty === "intermediate") {
      content += `This section will delve into core concepts and practical applications, building upon foundational knowledge.`
    } else if (difficulty === "advanced") {
      content += `This section will explore advanced theories, complex implementations, and cutting-edge research in this area.`
    }

    content += `
## Why It Matters
• Builds foundational knowledge for more advanced ${topic} concepts for ${audience}  
• Provides a common vocabulary and mental model relevant to ${difficulty} level  
• Helps you recognise practical use-cases and avoid common pitfalls in ${topic} for ${audience}

## Key Points
1.  Start from a clear definition of ${lessonTitle} for a ${difficulty} understanding.  
2.  Understand how it fits into the wider ${topic} landscape for ${audience}.  
3.  Practise applying the idea with short exercises and mini-projects relevant to your ${difficulty} level.

## Next Steps
Proceed to the next lesson where we dive deeper into related techniques and tools, suitable for ${difficulty} ${audience}.
`
    return content.trim()
  }

  private static generateQuestions(
    topic: string,
    lessonTitle: string,
    difficulty: "beginner" | "intermediate" | "advanced",
    audience: string,
  ): Question[] {
    const topicLower = topic.toLowerCase()
    const titleLower = lessonTitle.toLowerCase()

    // Java-specific questions
    if (topicLower.includes("java")) {
      if (titleLower.includes("what is java")) {
        return [
          {
            id: "1",
            question: "What does WORA stand for in the context of Java, and what does it mean?",
            answer: `WORA stands for "Write Once, Run Anywhere." It means that Java code, once compiled into bytecode, can be executed on any platform that has a Java Virtual Machine (JVM) installed, without needing to be recompiled for each specific operating system or hardware. This is a core principle of Java's platform independence.`,
            type: "short-answer",
          },
          {
            id: "2",
            question: "Which component is responsible for converting Java bytecode into machine-specific code?",
            answer: "JVM (Java Virtual Machine)",
            type: "multiple-choice",
            options: [
              "JDK (Java Development Kit)",
              "JRE (Java Runtime Environment)",
              "JVM (Java Virtual Machine)",
              "Java SE",
            ],
          },
        ]
      }
      if (titleLower.includes("object-oriented programming")) {
        return [
          {
            id: "1",
            question: "Explain the difference between a Class and an Object in Java OOP.",
            answer: `In Java OOP:
**Class**: A class is a blueprint or a template for creating objects. It defines the properties (attributes) and behaviors (methods) that objects of that class will have. It's a logical construct and doesn't occupy memory until an object is created from it.
**Object**: An object is an instance of a class. It's a real-world entity that has state (values for its attributes) and behavior (actions it can perform). When an object is created, memory is allocated for it.

**Analogy**: A class is like a cookie cutter, and an object is like the actual cookie produced by that cutter. You can make many cookies (objects) from one cookie cutter (class).`,
            type: "short-answer",
          },
          {
            id: "2",
            question:
              "Which OOP principle is about bundling data and methods into a single unit and restricting direct access?",
            answer: "Encapsulation",
            type: "multiple-choice",
            options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
          },
        ]
      }
    }

    // AI-specific questions
    if (topicLower === "artificial intelligence" || topicLower === "ai") {
      if (titleLower.includes("what is artificial intelligence")) {
        if (difficulty === "beginner") {
          return [
            {
              id: "1",
              question: "What is the simplest way to describe Artificial Intelligence?",
              answer: "Teaching computers to think and learn like humans.",
              type: "short-answer",
            },
            {
              id: "2",
              question: "Which of these is an example of AI you might use every day?",
              answer: "Voice assistants like Siri or Google Assistant",
              type: "multiple-choice",
              options: [
                "A calculator doing math",
                "A simple alarm clock",
                "Voice assistants like Siri or Google Assistant",
                "A basic word processor",
              ],
            },
          ]
        } else if (difficulty === "intermediate") {
          return [
            {
              id: "1",
              question: "What is Artificial Intelligence and how does it differ from traditional computer programming?",
              answer: `Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think, learn, and make decisions like humans. 

**Key Differences from Traditional Programming:**

**Traditional Programming:**
- Follows explicit, pre-written instructions
- Uses fixed rules and logic
- Input + Program = Output
- Cannot adapt without reprogramming

**Artificial Intelligence:**
- Learns patterns from data
- Adapts and improves over time
- Data + Desired Output = Program (Model)
- Can handle new situations without explicit programming

**AI Capabilities:**
- Visual perception and image recognition
- Speech recognition and natural language processing
- Decision-making based on data analysis
- Learning from experience and feedback
- Problem-solving in complex scenarios

**Real-World Example:**
Traditional programming for email would require writing specific rules for every possible spam indicator. AI learns from thousands of spam/non-spam examples and automatically identifies new spam patterns it has never seen before.`,
              type: "short-answer",
            },
            {
              id: "2",
              question: "What are the three main types of AI and which one exists today?",
              answer: "Narrow AI (Weak AI) - This is what exists today",
              type: "multiple-choice",
              options: [
                "General AI (Strong AI) - Human-level intelligence",
                "Narrow AI (Weak AI) - This is what exists today",
                "Super AI - Beyond human intelligence",
                "Quantum AI - Using quantum computers",
              ],
            },
            {
              id: "3",
              question: "Name five real-world applications of AI that you might use in your daily life.",
              answer: `Here are five common AI applications in daily life:

**1. Smartphone Voice Assistants**
- Siri, Google Assistant, Alexa
- Speech recognition and natural language processing
- Answering questions, setting reminders, controlling smart devices

**2. Social Media and Entertainment**
- Facebook/Instagram news feed algorithms
- Netflix and Spotify recommendations
- YouTube video suggestions
- Content personalization based on your preferences

**3. Navigation and Transportation**
- Google Maps traffic optimization and route planning
- Uber/Lyft ride matching and pricing
- Waze real-time traffic updates
- Predictive arrival times

**4. Online Shopping**
- Amazon product recommendations
- Price comparison and deal alerts
- Fraud detection for credit card transactions
- Chatbots for customer service

**5. Photo and Camera Apps**
- Automatic photo tagging and organization
- Portrait mode and photo enhancement
- Google Photos search functionality
- Snapchat and Instagram filters

These applications use machine learning to analyze patterns in data and provide personalized, intelligent responses that improve over time.`,
              type: "short-answer",
            },
            {
              id: "4",
              question:
                "True or False: Current AI systems have human-level general intelligence and can understand context like humans do.",
              answer: `False. This is a common misconception about current AI capabilities.

**Why This is False:**

**Current AI Limitations:**
- **Narrow Intelligence**: Today's AI excels at specific tasks but cannot transfer knowledge between domains
- **Lack of Common Sense**: AI doesn't understand context, causation, or basic world knowledge like humans
- **No General Understanding**: Cannot reason about unfamiliar situations the way humans can
- **Pattern Recognition Only**: AI recognizes patterns in data but doesn't truly "understand" meaning

**Examples of Limitations:**
- A chess AI cannot play checkers without retraining
- Image recognition AI might identify a school bus in snow as a snowplow
- Chatbots can give nonsensical responses when faced with unexpected questions
- AI cannot understand sarcasm, humor, or cultural context reliably

**What AI Can Do Well:**
- Specific tasks with clear patterns (image recognition, language translation)
- Processing large amounts of data quickly
- Finding correlations humans might miss
- Consistent performance without fatigue

**The Goal:**
Researchers are working toward Artificial General Intelligence (AGI) - human-level intelligence across all domains - but this doesn't exist yet and may be decades away.

**Key Takeaway:** Current AI is incredibly powerful for specific tasks but lacks the flexible, contextual understanding that humans take for granted.`,
              type: "true-false",
            },
            {
              id: "5",
              question: "What are the main benefits and limitations of current AI technology?",
              answer: `AI technology offers significant benefits but also has important limitations:

**Main Benefits:**

**1. Efficiency and Speed**
- Processes vast amounts of data instantly
- Automates repetitive tasks
- Works 24/7 without breaks or fatigue
- Reduces human error in routine tasks

**2. Enhanced Capabilities**
- Recognizes patterns humans might miss
- Handles complex calculations and analysis
- Provides personalized recommendations
- Enables new products and services

**3. Cost Reduction**
- Reduces labor costs for routine tasks
- Minimizes errors and rework
- Optimizes resource allocation
- Scales without proportional cost increases
- Reduces human error in routine tasks

**4. Improved Decision Making**
- Analyzes data objectively
- Provides data-driven insights
- Reduces bias in certain decisions
- Enables predictive analytics

**Main Limitations:**

**1. Lack of Understanding**
- No common sense or contextual understanding
- Cannot explain reasoning clearly
- Struggles with ambiguous situations
- Limited creativity and innovation

**2. Data Dependency**
- Requires large amounts of quality training data
- Performance degrades with poor or biased data
- Cannot work effectively without relevant data
- Vulnerable to data poisoning attacks

**3. Bias and Fairness Issues**
- Can perpetuate or amplify human biases
- May discriminate against certain groups
- Reflects biases present in training data
- Difficult to ensure fairness across all populations

**4. Technical Limitations**
- Brittle - small changes can cause failures
- Difficult to update or modify once deployed
- High computational requirements
- Security vulnerabilities

**5. Ethical and Social Concerns**
- Job displacement in certain sectors
- Privacy concerns with data collection
- Potential for misuse or abuse
- Lack of accountability for decisions

**Balancing Benefits and Limitations:**
The key is understanding what AI can and cannot do, using it appropriately for suitable tasks while maintaining human oversight for critical decisions.`,
              type: "short-answer",
            },
          ]
        }
      }
    }

    // Machine Learning specific questions
    if (topicLower === "machine learning" || topicLower === "ml") {
      if (titleLower.includes("introduction to machine learning")) {
        if (difficulty === "beginner") {
          return [
            {
              id: "1",
              question: "What is the main goal of Machine Learning?",
              answer: "To teach computers to learn from data without being explicitly programmed.",
              type: "short-answer",
            },
            {
              id: "2",
              question: "Which of these is an example of Machine Learning in action?",
              answer: "An online store suggesting products you might like",
              type: "multiple-choice",
              options: [
                "A calculator adding numbers",
                "A basic word processor checking spelling",
                "An online store suggesting products you might like",
                "A simple game of Tic-Tac-Toe",
              ],
            },
          ]
        } else if (difficulty === "intermediate") {
          return [
            {
              id: "1",
              question: "How does machine learning differ from traditional programming? Provide a clear example.",
              answer: `Machine learning differs fundamentally from traditional programming in how problems are solved:

  **Traditional Programming:**
  - **Approach**: Input + Program → Output
  - **Process**: Programmer writes explicit rules and logic
  - **Example**: Email spam filter with manual rules

  **Machine Learning:**
  - **Approach**: Input + Desired Output → Output (Model)
  - **Process**: Computer learns patterns from data
  - **Example**: Email spam filter that learns from examples

  **Detailed Example – Email Spam Detection:**

      if email.contains("FREE MONEY") or
         email.contains("URGENT") or
         email.sender not in contacts or
         email.has_many_exclamation_marks():
          classify_as_spam()
      else:
          classify_as_not_spam()

  **Problems with the traditional approach**
  - Must manually identify every spam indicator  
  - Spammers easily bypass hard-coded rules  
  - Requires constant manual updates

  **How an ML approach fixes this**
  1. **Training data** – thousands of labelled emails  
  2. **Learning** – algorithm finds spam patterns automatically  
  3. **Model** – rules are created by the computer, not the programmer  
  4. **Prediction** – new emails are classified automatically  
  5. **Improvement** – performance gets better with more data

  **Key insight:** traditional programming writes the rules, whereas ML
  lets data create the rules.`,
              type: "short-answer",
            },
            {
              id: "2",
              question: "What are the three main types of machine learning? Give an example of each.",
              answer: `The three main types of machine learning are:

**1. Supervised Learning**
**Definition**: Learning with labeled examples (input-output pairs)

**How it works**: 
- Algorithm learns from data where the correct answer is provided
- Builds a model to map inputs to correct outputs
- Makes predictions on new, unseen data

**Example**: **Medical Diagnosis**
- **Training Data**: Patient symptoms + known diagnoses
- **Learning**: Algorithm learns which symptoms indicate which diseases
- **Prediction**: Given new patient symptoms, predict likely diagnosis
- **Other Examples**: Email spam detection, house price prediction, image classification

**2. Unsupervised Learning**
**Definition**: Finding hidden patterns in data without labeled examples

**How it works**:
- Algorithm analyzes data to discover hidden structures
- No "correct answers" provided during training
- Identifies patterns, groups, or anomalies

**Example**: **Customer Segmentation**
- **Input Data**: Customer purchase history, demographics, behavior
- **Learning**: Algorithm groups customers with similar characteristics
- **Output**: Customer segments (e.g., "budget shoppers," "luxury buyers," "frequent purchasers")
- **Other Examples**: Market basket analysis, anomaly detection, data compression

**3. Reinforcement Learning**
**Definition**: Learning through interaction and feedback (rewards/penalties)

**How it works**:
- Agent takes actions in an environment
- Receives rewards for good actions, penalties for bad ones
- Learns to maximize rewards over time

**Example**: **Game Playing (Chess/Go)**
- **Environment**: Game board and rules
- **Actions**: Possible moves
- **Rewards**: +1 for winning, -1 for losing, 0 for draw
- **Learning**: Algorithm learns winning strategies through millions of games
- **Other Examples**: Autonomous driving, trading algorithms, robotics

**Key Differences Summary:**
- **Supervised**: "Here are examples with correct answers, learn the pattern"
- **Unsupervised**: "Find interesting patterns in this data"
- **Reinforcement**: "Learn through trial and error with feedback"

Each type is suited for different kinds of problems and data availability.`,
              type: "short-answer",
            },
          ]
        } else if (difficulty === "advanced") {
          return [
            {
              id: "1",
              question:
                "Explain the Bias-Variance Trade-off in supervised learning and its implications for model generalization.",
              answer: `The **Bias-Variance Trade-off** is a central concept in supervised machine learning that describes the relationship between a model's ability to fit the training data (bias) and its sensitivity to fluctuations in the training data (variance).

-   **Bias**: Error introduced by approximating a real-world problem (which may be complex) with a simplified model. High bias implies the model is **underfitting** the data, failing to capture the underlying patterns. It's a systematic error.
-   **Variance**: Error introduced by the model's sensitivity to small fluctuations in the training data. High variance implies the model is **overfitting** the data, learning noise and specific details from the training set that do not generalize to unseen data.

**Implications for Model Generalization**:
-   **High Bias, Low Variance (Underfitting)**: The model is too simple. It performs poorly on both training and test data because it cannot capture the complexity of the problem.
-   **Low Bias, High Variance (Overfitting)**: The model is too complex. It performs very well on training data but poorly on unseen test data because it has memorized the training data, including noise.
-   **Optimal Model**: Aims for a balance, achieving sufficiently low bias to capture the signal and sufficiently low variance to generalize well to new data. This is the "sweet spot" where the model performs best on unseen data.

**Strategies to manage the trade-off**:
-   **Reduce Variance**: More data, simpler models, regularization (L1/L2), ensemble methods (Bagging like Random Forests).
-   **Reduce Bias**: More complex models, adding more features, ensemble methods (Boosting like Gradient Boosting).

Understanding this trade-off is crucial for selecting appropriate models and tuning their hyperparameters to achieve optimal performance on unseen data.`,
              type: "short-answer",
            },
            {
              id: "2",
              question:
                "Discuss the concept of 'concept drift' in deployed ML models and strategies to mitigate its impact.",
              answer: `**Concept drift** refers to the phenomenon where the statistical properties of the target variable (the concept) change over time in unforeseen ways, causing the performance of a deployed machine learning model to degrade. This is distinct from **data drift**, where only the input data distribution changes, but the relationship between inputs and outputs remains stable.

**Causes of Concept Drift**:
-   Changes in user behavior (e.g., new trends in e-commerce).
-   Changes in underlying processes (e.g., new regulations affecting financial fraud patterns).
-   Changes in sensor calibration or data collection methods.
-   Emergence of new patterns or relationships that the model was not trained on.

**Impact**: A model trained on historical data becomes less accurate or even irrelevant as the underlying concept it's trying to predict evolves.

**Strategies to Mitigate Concept Drift**:
1.  **Monitoring**: Continuously monitor model performance (e.g., accuracy, precision, recall) and data characteristics (e.g., feature distributions, prediction distributions) in production. Alerts can be triggered when performance drops or data patterns shift.
2.  **Retraining Policies**:
    -   **Periodic Retraining**: Retrain the model at fixed intervals (e.g., daily, weekly). Simple but might miss sudden drifts or retrain unnecessarily.
    -   **Trigger-Based Retraining**: Retrain when performance metrics drop below a threshold, or when significant data/concept drift is detected. This is more adaptive.
    -   **Online Learning**: Models that continuously update their parameters as new data arrives, adapting in real-time. More complex to implement and manage.
3.  **Ensemble Methods**: Using an ensemble of models, where older models are gradually phased out and newer models are introduced, can help adapt to changing concepts.
4.  **Feature Engineering**: Regularly re-evaluating and updating features to ensure they remain relevant to the evolving concept.
5.  **Data Windowing**: Training models on a sliding window of recent data, giving more weight to newer observations.
6.  **Drift Detection Algorithms**: Specialized algorithms (e.g., DDM, EDDM, ADWIN) that statistically detect changes in data streams and signal potential concept drift.

Effective MLOps practices are crucial for implementing these mitigation strategies and ensuring the long-term reliability of deployed ML systems.`,
              type: "short-answer",
            },
          ]
        }
      }
    }

    // Web development questions
    if (
      topicLower.includes("web") ||
      topicLower.includes("html") ||
      topicLower.includes("css") ||
      topicLower.includes("javascript")
    ) {
      if (titleLower.includes("what is web development")) {
        return [
          {
            id: "1",
            question: "What is web development and what are its main components?",
            answer: `Web development is the process of creating websites and web applications that run on the internet or intranet. It involves designing, building, and maintaining websites using various programming languages, frameworks, and tools.

**Main Components:**

**1. Frontend Development (Client-Side)**
- **Purpose**: What users see and interact with directly
- **Technologies**: HTML, CSS, JavaScript
- **Responsibilities**: User interface, user experience, responsive design, interactivity
- **Example**: The buttons, forms, and visual elements you see on a website

**2. Backend Development (Server-Side)**
- **Purpose**: Behind-the-scenes functionality that powers websites
- **Technologies**: Python, Node.js, Java, PHP, databases
- **Responsibilities**: Server logic, database management, APIs, security, authentication
- **Example**: Processing form submissions, user login systems, data storage

**3. Database Management**
- **Purpose**: Storing and organizing data
- **Technologies**: MySQL, PostgreSQL, MongoDB
- **Responsibilities**: Data storage, retrieval, security, backup
- **Example**: Making your website accessible at www.yoursite.com

**4. DevOps and Deployment**
- **Purpose**: Getting websites live and maintaining them
- **Technologies**: AWS, Docker, CI/CD pipelines
- **Responsibilities**: Hosting, monitoring, updates, security patches
- **Example**: Making your website accessible at www.yoursite.com

**How They Work Together:**
Frontend communicates with backend through APIs, backend processes requests and interacts with databases, and DevOps ensures everything runs smoothly in production.`,
            type: "short-answer",
          },
          {
            id: "2",
            question: "What is the difference between frontend and backend development?",
            answer:
              "Frontend is what users see and interact with (client-side), while backend handles server logic and data processing (server-side)",
            type: "multiple-choice",
            options: [
              "Frontend is more important than backend development",
              "Frontend is what users see and interact with (client-side), while backend handles server logic and data processing (server-side)",
              "Frontend and backend are the same thing",
              "Backend is only used for mobile applications",
            ],
          },
        ]
      }
    }

    // Generic fallback for any topic
    return [
      {
        id: "1",
        question: `What is ${lessonTitle} and why is it important in ${topic} for a ${difficulty} ${audience}?`,
        answer: `For a ${difficulty} ${audience}, ${lessonTitle} is a fundamental concept in ${topic} that provides essential knowledge and skills for understanding and applying ${topic} principles effectively.`,
        type: "short-answer",
      },
      {
        id: "2",
        question: `What are the main applications of ${lessonTitle} in real-world scenarios for a ${difficulty} ${audience}?`,
        answer: `For a ${difficulty} ${audience}, ${lessonTitle} has numerous practical applications across various industries and contexts, helping to solve problems relevant to your skill level and field.`,
        type: "short-answer",
      },
      {
        id: "3",
        question: `What are the key skills needed to master ${lessonTitle} for a ${difficulty} ${audience}?`,
        answer: `To master ${lessonTitle} as a ${difficulty} ${audience}, you will need to develop both technical and soft skills, focusing on the foundational aspects and practical application relevant to your current stage of learning.`,
        type: "short-answer",
      },
    ]
  }

  private static generateKeyPoints(
    topic: string,
    lessonTitle: string,
    difficulty: "beginner" | "intermediate" | "advanced",
    audience: string,
  ): string[] {
    const topicLower = topic.toLowerCase()
    const titleLower = lessonTitle.toLowerCase()

    // Java-specific key points
    if (topicLower.includes("java")) {
      if (titleLower.includes("what is java")) {
        return [
          "Java is a high-level, object-oriented, platform-independent language.",
          "WORA (Write Once, Run Anywhere) is a core Java principle.",
          "The Java ecosystem includes JDK, JRE, and JVM.",
          "Java is popular for enterprise applications and Android development.",
          "Java code is compiled into bytecode and executed by the JVM.",
        ]
      }
      if (titleLower.includes("object-oriented programming")) {
        return [
          "OOP is based on objects, bundling data and methods.",
          "Classes are blueprints, objects are instances.",
          "Inheritance allows code reuse via parent-child relationships.",
          "Polymorphism enables objects to take many forms (overloading/overriding).",
          "Encapsulation protects data by restricting direct access.",
          "Abstraction hides complexity, showing only essential features.",
        ]
      }
    }

    // AI-specific key points
    if (topicLower === "artificial intelligence" || topicLower === "ai") {
      if (titleLower.includes("what is artificial intelligence")) {
        if (difficulty === "beginner") {
          return [
            "AI teaches computers to think and learn.",
            "Used in voice assistants and recommendations.",
            "Helps save time and solve problems.",
            "Current AI is task-specific, not human-like general intelligence.",
          ]
        } else if (difficulty === "intermediate") {
          return [
            "AI simulates human intelligence in machines that can learn and make decisions",
            "Current AI is narrow – great at single tasks but not general intelligence",
            "AI already powers voice assistants, recommendations and smart navigation",
            "Machine learning is a subset of AI that learns patterns from data",
            "Key limitations include data bias, lack of context and explainability issues",
            "Ethical, legal and social implications must be considered in every AI project",
          ]
        } else if (difficulty === "advanced") {
          return [
            "AI paradigms include Symbolic, Connectionist, and Statistical approaches.",
            "ANI is current AI; AGI and ASI are hypothetical future states.",
            "Key limitations: common sense, causality, explainability, data efficiency.",
            "Ethical concerns: bias, privacy, accountability, job displacement.",
            "Future research focuses on AGI, neuro-symbolic AI, and AI safety.",
            "Robust governance frameworks are essential for responsible AI development.",
          ]
        }
      }
    }

    // Machine Learning specific key points
    if (topicLower === "machine learning" || topicLower === "ml") {
      if (titleLower.includes("introduction to machine learning")) {
        if (difficulty === "beginner") {
          return [
            "ML teaches computers to learn from data.",
            "It's about finding patterns, not explicit rules.",
            "Used in spam filters and product suggestions.",
            "ML helps computers get smarter over time.",
          ]
        } else if (difficulty === "intermediate") {
          return [
            "ML enables computers to learn from data without explicit programming.",
            "Supervised, Unsupervised, and Reinforcement Learning are the main types.",
            "ML workflow includes data collection, preparation, model training, and evaluation.",
            "Data quality and quantity are crucial for effective ML models.",
            "ML is transforming industries from healthcare to finance.",
            "Understanding ML limitations (e.g., bias, interpretability) is as important as its capabilities.",
          ]
        } else if (difficulty === "advanced") {
          return [
            "ML uses statistical techniques for data-driven learning.",
            "Bias-Variance Trade-off is key for model generalization.",
            "MLOps ensures continuous integration, delivery, and monitoring of ML systems.",
            "Ethical challenges include bias, fairness, and interpretability.",
            "Concept drift requires continuous monitoring and retraining strategies.",
            "Current trends include LLMs, Generative AI, and causal inference.",
          ]
        }
      }
    }

    // Web-dev key points
    if (
      topicLower.includes("web") ||
      topicLower.includes("html") ||
      topicLower.includes("css") ||
      topicLower.includes("javascript")
    ) {
      if (titleLower.includes("what is web development")) {
        return [
          "Web development builds sites/apps that run in a browser using HTML, CSS and JS",
          "Frontend focuses on UI/UX; backend handles data, APIs and business logic",
          "Responsive design ensures usability on any device size",
          "Modern frameworks (React, Vue, Angular) speed up frontend development",
          "Version control (Git) and CI/CD pipelines are essential professional practices",
          "Continuous learning is vital as web tech evolves rapidly",
        ]
      }
    }

    // Generic fallback
    const genericPoints = [
      `${lessonTitle} is a core concept in ${topic} for ${audience}.`,
      `For a ${difficulty} level, focus on understanding the basics and practical applications.`,
      `Connect this idea to real-world scenarios relevant to ${audience}.`,
      `Review and practice regularly to solidify your ${difficulty} understanding.`,
    ]

    if (difficulty === "advanced") {
      genericPoints.push(`Explore the deeper theoretical implications and cutting-edge research in ${lessonTitle}.`)
    }

    return genericPoints
  }

  // ────────────────────────────────────────────────────────────
  // TOP-LEVEL STRUCTURE TEMPLATES
  // ────────────────────────────────────────────────────────────
  private static getTopicSpecificModules(topic: string): Array<{
    title: string
    description: string
    lessons: string[]
  }> {
    const t = topic.toLowerCase()

    // Prioritize specific topics
    if (t === "machine learning" || t === "ml") {
      return [
        {
          title: "Introduction to Machine Learning",
          description: "Core concepts of machine learning and data science",
          lessons: [
            "Introduction to Machine Learning",
            "Supervised vs Unsupervised Learning",
            "Training Data and Datasets",
            "Common ML Algorithms Overview",
            "Model Training and Evaluation",
            "Overfitting and Underfitting",
          ],
        },
        {
          title: "Deep Learning and Neural Networks",
          description: "Understanding neural networks and deep learning",
          lessons: [
            "Introduction to Neural Networks",
            "How Neural Networks Learn",
            "Deep Learning Architecture",
            "Convolutional Neural Networks (CNNs)",
            "Recurrent Neural Networks (RNNs)",
            "Popular Deep Learning Frameworks",
          ],
        },
        {
          title: "Natural Language Processing for ML",
          description: "Applying ML to understand and process human language",
          lessons: [
            "What is Natural Language Processing?",
            "Text Processing and Tokenization",
            "Sentiment Analysis with ML",
            "Language Models and Embeddings",
            "Chatbots and Conversational AI",
          ],
        },
        {
          title: "Computer Vision for ML",
          description: "Teaching machines to see and interpret visual data using ML",
          lessons: [
            "Introduction to Computer Vision",
            "Image Recognition and Classification",
            "Object Detection and Tracking",
            "Facial Recognition Technology",
            "Applications in Autonomous Systems",
          ],
        },
        {
          title: "ML Ethics and Deployment",
          description: "Responsible ML development, MLOps, and future implications",
          lessons: [
            "ML Ethics and Bias",
            "Privacy and Security in ML",
            "Model Deployment and MLOps",
            "Monitoring and Maintenance",
            "Future Trends in Machine Learning",
          ],
        },
      ]
    }

    if (t === "artificial intelligence" || t === "ai") {
      return [
        {
          title: "Introduction to Artificial Intelligence",
          description: "Fundamental concepts, history, and applications of AI",
          lessons: [
            "What is Artificial Intelligence?",
            "History and Evolution of AI",
            "Types of AI: Narrow, General, and Super AI",
            "AI vs Machine Learning vs Deep Learning",
            "Current AI Applications and Use Cases",
          ],
        },
        {
          title: "AI Problem Solving and Search",
          description: "Techniques for AI to solve problems and navigate spaces",
          lessons: [
            "Problem-Solving Agents",
            "Uninformed Search Strategies",
            "Informed Search Strategies",
            "Adversarial Search and Game Playing",
            "Constraint Satisfaction Problems",
          ],
        },
        {
          title: "Knowledge Representation and Reasoning",
          description: "How AI systems represent and reason with knowledge",
          lessons: [
            "Logical Agents",
            "First-Order Logic",
            "Inference in First-Order Logic",
            "Knowledge Representation Techniques",
            "Uncertainty and Probabilistic Reasoning",
          ],
        },
        {
          title: "Planning and Robotics",
          description: "AI for automated planning and robotic systems",
          lessons: [
            "Classical Planning",
            "Planning and Acting in the Real World",
            "Robotics Fundamentals",
            "Robot Motion Planning",
            "Human-Robot Interaction",
          ],
        },
        {
          title: "AI Ethics and Societal Impact",
          description: "Responsible AI development and future implications",
          lessons: [
            "AI Ethics and Bias",
            "Privacy and Security in AI",
            "AI in Society and Employment",
            "Regulation and Governance",
            "Future of AI Technology",
            "Career Opportunities in AI",
          ],
        },
      ]
    }

    if (t.includes("java")) {
      return [
        {
          title: "Introduction to Java",
          description: "Basic concepts and setup for Java programming",
          lessons: [
            "What is Java?",
            "Setting up Java Development Environment",
            "Basic Syntax and Data Types",
            "Operators and Expressions",
            "Control Flow Statements",
          ],
        },
        {
          title: "Object-Oriented Programming (OOP) in Java",
          description: "Understanding the core principles of OOP with Java",
          lessons: [
            "Classes and Objects",
            "Constructors and Methods",
            "Inheritance and Polymorphism",
            "Abstraction and Encapsulation",
            "Interfaces and Abstract Classes",
          ],
        },
        {
          title: "Advanced Java Concepts",
          description: "Exploring more complex features of the Java language",
          lessons: [
            "Exception Handling",
            "Collections Framework (Lists, Sets, Maps)",
            "Generics",
            "File I/O and Serialization",
            "Multithreading and Concurrency",
          ],
        },
        {
          title: "Java Standard Libraries and APIs",
          description: "Leveraging Java's rich built-in functionalities",
          lessons: [
            "String Manipulation",
            "Date and Time API",
            "Networking Basics",
            "JDBC for Database Connectivity",
            "Lambda Expressions and Streams (Java 8+)",
          ],
        },
        {
          title: "Building Applications with Java",
          description: "Practical application development using Java",
          lessons: [
            "Introduction to Maven/Gradle",
            "Unit Testing with JUnit",
            "Basic Web Application with Servlets/JSP",
            "Introduction to Spring Framework",
            "Deployment Considerations",
          ],
        },
      ]
    }

    // Web Development modules
    if (t.includes("web") || t.includes("html") || t.includes("css") || t.includes("javascript")) {
      return [
        {
          title: "Web Development Fundamentals",
          description: "Basic concepts and technologies for web development",
          lessons: [
            "What is Web Development?",
            "How the Internet Works",
            "Client-Server Architecture",
            "Frontend vs Backend Development",
            "Web Development Tools and Environment",
          ],
        },
        {
          title: "HTML and CSS Basics",
          description: "Building the structure and styling of web pages",
          lessons: [
            "HTML Fundamentals and Structure",
            "HTML Elements and Attributes",
            "CSS Basics and Selectors",
            "CSS Layout and Positioning",
            "Responsive Web Design",
            "CSS Frameworks and Libraries",
          ],
        },
        {
          title: "JavaScript Programming",
          description: "Adding interactivity and dynamic behavior to websites",
          lessons: [
            "JavaScript Fundamentals",
            "Variables, Functions, and Objects",
            "DOM Manipulation",
            "Event Handling",
            "Asynchronous JavaScript",
            "Modern JavaScript (ES6+)",
          ],
        },
        {
          title: "Frontend Frameworks",
          description: "Modern tools for building complex web applications",
          lessons: [
            "Introduction to Frontend Frameworks",
            "React.js Fundamentals",
            "Component-Based Architecture",
            "State Management",
            "Routing and Navigation",
            "Building and Deploying Applications",
          ],
        },
        {
          title: "Backend Development",
          description: "Server-side programming and database management",
          lessons: [
            "Backend Development Concepts",
            "Server-Side Programming Languages",
            "Databases and Data Storage",
            "APIs and Web Services",
            "Authentication and Security",
            "Deployment and Hosting",
          ],
        },
        {
          title: "Full-Stack Development",
          description: "Integrating frontend and backend for complete applications",
          lessons: [
            "Full-Stack Architecture",
            "Connecting Frontend and Backend",
            "Database Integration",
            "User Authentication Systems",
            "Performance Optimization",
            "Professional Development Practices",
          ],
        },
      ]
    }

    // Digital Marketing modules
    if (t.includes("marketing") || t.includes("digital marketing")) {
      return [
        {
          title: "Digital Marketing Fundamentals",
          description: "Core concepts and strategies in digital marketing",
          lessons: [
            "What is Digital Marketing?",
            "Digital Marketing vs Traditional Marketing",
            "Digital Marketing Channels Overview",
            "Target Audience and Customer Personas",
            "Marketing Funnel and Customer Journey",
          ],
        },
        {
          title: "Search Engine Optimization (SEO)",
          description: "Improving website visibility in search results",
          lessons: [
            "Introduction to SEO",
            "Keyword Research and Analysis",
            "On-Page SEO Optimization",
            "Technical SEO",
            "Link Building Strategies",
            "SEO Tools and Analytics",
          ],
        },
        {
          title: "Social Media Marketing",
          description: "Leveraging social platforms for marketing success",
          lessons: [
            "Social Media Marketing Strategy",
            "Platform-Specific Marketing",
            "Content Creation and Curation",
            "Community Management",
            "Social Media Advertising",
            "Influencer Marketing",
          ],
        },
        {
          title: "Content Marketing",
          description: "Creating valuable content to attract and engage audiences",
          lessons: [
            "Content Marketing Strategy",
            "Content Types and Formats",
            "Content Creation Process",
            "Content Distribution Channels",
            "Content Performance Measurement",
            "Content Marketing Tools",
          ],
        },
        {
          title: "Paid Advertising",
          description: "Effective paid advertising strategies and campaigns",
          lessons: [
            "Introduction to Paid Advertising",
            "Google Ads and Search Marketing",
            "Facebook and Social Media Ads",
            "Display and Video Advertising",
            "Campaign Optimization",
            "ROI and Performance Tracking",
          ],
        },
        {
          title: "Analytics and Optimization",
          description: "Measuring and improving marketing performance",
          lessons: [
            "Digital Marketing Analytics",
            "Google Analytics Setup",
            "Key Performance Indicators (KPIs)",
            "A/B Testing and Optimization",
            "Conversion Rate Optimization",
            "Marketing Attribution and ROI",
          ],
        },
      ]
    }

    // Generic fallback for any other topic
    return [
      {
        title: `Introduction to ${topic}`,
        description: `Fundamental concepts and overview of ${topic}`,
        lessons: [
          `What is ${topic}?`,
          `History and Evolution of ${topic}`,
          `Key Concepts and Terminology`,
          `Applications and Use Cases`,
          `Getting Started with ${topic}`,
        ],
      },
      {
        title: `Core Principles of ${topic}`,
        description: `Essential principles and methodologies`,
        lessons: [
          `Fundamental Principles`,
          `Best Practices and Standards`,
          `Common Approaches and Methods`,
          `Tools and Technologies`,
          `Problem-Solving Techniques`,
        ],
      },
      {
        title: `Practical Applications`,
        description: `Real-world implementation and examples`,
        lessons: [
          `Real-World Examples`,
          `Case Studies and Success Stories`,
          `Implementation Strategies`,
          `Common Challenges and Solutions`,
          `Project Planning and Execution`,
        ],
      },
      {
        title: `Advanced Concepts`,
        description: `Advanced techniques and specialized knowledge`,
        lessons: [
          `Advanced Techniques`,
          `Specialized Applications`,
          `Integration with Other Systems`,
          `Performance Optimization`,
          `Innovation and Future Trends`,
        ],
      },
      {
        title: `Professional Practice`,
        description: `Industry standards and career development`,
        lessons: [
          `Industry Standards`,
          `Professional Development`,
          `Career Opportunities`,
          `Networking and Community`,
          `Continuous Learning`,
        ],
      },
    ]
  }

  // ────────────────────────────────────────────────────────────
  // MEDIA HELPERS
  // ────────────────────────────────────────────────────────────
  private static generateVideoUrl(topic: string, lesson: string, difficulty: string, audience: string): string {
    const query = `${topic} ${lesson} ${difficulty} tutorial for ${audience}`.replace(/\s+/g, "+")
    return `https://www.youtube.com/results?search_query=${query}`
  }

  private static generateVideoDescription(topic: string, lesson: string, difficulty: string, audience: string): string {
    return `This ${difficulty}-level video tutorial covers "${lesson}" in "${topic}", tailored specifically for ${audience}. You'll find clear explanations, practical examples, and step-by-step guidance to deepen your understanding. This video includes visual demonstrations and real-world applications to help you master these concepts.`
  }

  private static async generateCourseImage(topic: string, difficulty: string, audience: string): Promise<string> {
    const imageQuery = `${topic} ${difficulty} ${audience} learning`.replace(/\s+/g, "+")
    return `https://source.unsplash.com/400x300/?${encodeURIComponent(imageQuery)}`
  }

  // ────────────────────────────────────────────────────────────
  // DURATIONS
  // ────────────────────────────────────────────────────────────
  private static calculateModuleDuration(lessons: Lesson[]): string {
    const total = lessons.length * 25 // minutes
    return total >= 60 ? `${Math.floor(total / 60)}h ${total % 60}m` : `${total}m`
  }

  private static calculateTotalDuration(modules: Module[]): string {
    const mins = modules
      .map((m) => {
        const [h, mStr] = m.duration.split("h")
        return h ? +h * 60 + Number.parseInt(mStr) : Number.parseInt(m.duration)
      })
      .reduce((a, b) => a + b, 0)

    return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`
  }
}
