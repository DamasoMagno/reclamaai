import { Comment, Topic, topicSeed } from "./topics"

let topicsCache: Topic[] = JSON.parse(JSON.stringify(topicSeed))

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function wait(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

export async function fetchTopics(): Promise<Topic[]> {
  await wait()
  return clone(topicsCache)
}

export async function fetchTopicById(id: string): Promise<Topic | null> {
  await wait()
  const topic = topicsCache.find((item) => item.id === id)
  return topic ? clone(topic) : null
}

export async function voteTopic(topicId: string, vote: "support" | "reject", previousVote?: "support" | "reject") {
  topicsCache = topicsCache.map((topic) => {
    if (topic.id !== topicId) return topic
    let support = topic.supportCount
    let reject = topic.rejectCount
    if (previousVote) {
      if (previousVote === "support") support = Math.max(0, support - 1)
      if (previousVote === "reject") reject = Math.max(0, reject - 1)
    }
    if (vote === "support") support += 1
    if (vote === "reject") reject += 1
    return { ...topic, supportCount: support, rejectCount: reject }
  })

  await wait()
  return clone(topicsCache.find((topic) => topic.id === topicId)!)
}

export async function addComment(topicId: string, comment: Omit<Comment, "id" | "createdAt">) {
  const newComment: Comment = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    ...comment,
  }

  topicsCache = topicsCache.map((topic) => {
    if (topic.id !== topicId) return topic
    return { ...topic, comments: [...topic.comments, newComment] }
  })

  await wait()
  return clone(newComment)
}
