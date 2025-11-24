"use client";

import * as React from "react";
import Link from "next/link";
import {
  Ban,
  ChevronDown,
  Loader2,
  Megaphone,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Topic } from "@/lib/topics";
import {
  formatLocation,
  formatNumber,
  formatOpenDuration,
  formatRelativeDay,
} from "@/lib/topics";

const priorityStyles = {
  Alta: "bg-[#d32f2f1a] text-[#d32f2f]",
  Média: "bg-[#ffa0001a] text-[#ffa000]",
  Baixa: "bg-[#1976d21a] text-[#1976d2]",
};

const statusStyles = {
  progress: "bg-[#ed6c021a] text-[#ed6c02]",
  politician: "bg-[#9c27b01a] text-[#9c27b0]",
  unresolved: "bg-[#7575751a] text-[#757575]",
};

const scopeLabels = {
  NEIGHBORHOOD: "Bairro",
  CITY: "Cidade",
  STATE: "Estado",
  COUNTRY: "País",
};

type Props = {
  topic: Topic;
  userVote?: "support" | "reject";
  showExamples: boolean;
  onToggleExamples: (id: string) => void;
  onVote: (id: string, type: "support" | "reject") => void;
  onAddComment: (id: string, text: string) => void;
  currentUserName: string;
};

export function TopicCard({
  topic,
  userVote,
  showExamples,
  onToggleExamples,
  onVote,
  onAddComment,
  currentUserName,
}: Props) {
  const contacts = topic.contacts ?? [];
  const [comment, setComment] = React.useState("");
  const disabledVoting = Boolean(userVote);

  return (
    <article className="overflow-hidden rounded-xl border border-[#f0f2f4] bg-white text-[#111418] shadow-sm dark:border-[#36414a] dark:bg-[#1b2837]">
      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <Link
              href={`/topicos/${topic.id}`}
              className="text-xl font-bold leading-tight tracking-tight text-[#111418] hover:text-[#1173d4] dark:text-[#f0f2f4]"
            >
              {topic.title}
            </Link>
            <PriorityBadge level={topic.priority} />
          </div>
        </div>
        <p className="text-base text-[#617589] dark:text-[#90a4b7]">
          {topic.summary}
        </p>
        {/* <div className="flex flex-wrap items-center gap-3 text-sm text-[#617589] dark:text-[#90a4b7]">
          <span>
            <MessageSquare className="mr-1 inline size-4" />{" "}
            {formatNumber(topic.complaintsTotal)} reclamações
          </span>
          <span>• {formatOpenDuration(topic.createdAt)}</span>
          <span>
            • Última reclamação: {formatRelativeDay(topic.lastComplaintAt)}
          </span>
        </div> */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* <div className="flex gap-2">
            <VoteButton
              label="Apoiar"
              count={topic.supportCount}
              icon={<ThumbsUp className="size-4 text-green-600" />}
              onClick={() => onVote(topic.id, "support")}
              disabled={disabledVoting}
              active={userVote === "support"}
            />
            <VoteButton
              label="Não é prioridade"
              count={topic.rejectCount}
              icon={<ThumbsDown className="size-4 text-red-600" />}
              onClick={() => onVote(topic.id, "reject")}
              disabled={disabledVoting}
              active={userVote === "reject"}
            />
          </div> */}
          {topic.exampleComplaints && topic.exampleComplaints.length > 0 && (
            <button
              className="flex items-center gap-2 text-sm font-medium text-[#617589] underline underline-offset-4 hover:text-[#1173d4]"
              type="button"
              onClick={() => onToggleExamples(topic.id)}
            >
              {showExamples
                ? "Ocultar exemplos"
                : "Ver exemplos de reclamações"}
              <ChevronDown
                className={`size-4 transition-transform ${
                  showExamples ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {topic.exampleComplaints &&
        topic.exampleComplaints.length > 0 &&
        showExamples && (
          <div className="border-y border-[#e5e7eb] bg-[#f6f7f8] px-6 py-6 dark:border-[#36414a] dark:bg-[#101922]">
            <h4 className="text-sm font-bold text-[#111418] dark:text-[#f0f2f4]">
              Reclamações que deram origem ao tópico
            </h4>
            <div className="mt-4 space-y-4">
              {topic.exampleComplaints.map((complaint) => (
                <div
                  key={`${topic.id}-${complaint.author}`}
                  className="border-b border-[#e5e7eb] pb-4 last:border-b-0 last:pb-0 dark:border-[#36414a]"
                >
                  <div className="mb-1 flex items-center gap-2 text-sm text-[#617589] dark:text-[#90a4b7]">
                    <User className="size-4" />
                    <span className="font-medium">{complaint.author}</span>
                    <span className="text-xs">• {complaint.time}</span>
                  </div>
                  <p className="text-sm text-[#111418] dark:text-[#f0f2f4]">
                    &quot;{complaint.text}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      {contacts.length > 0 && <ContactsList contacts={contacts} />}
      {/* <CommentsSection
        comments={topic.comments}
        comment={comment}
        onChange={setComment}
        onSubmit={() => {
          if (!comment.trim()) return;
          onAddComment(topic.id, comment.trim());
          setComment("");
        }}
        currentUserName={currentUserName}
      /> */}
    </article>
  );
}

function VoteButton({
  label,
  count,
  icon,
  onClick,
  disabled,
  active,
}: {
  label: string;
  count: number;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <Button
      variant="outline"
      className={`h-9 gap-2 rounded-lg border-[#f0f2f4] bg-white text-sm font-medium ${
        active ? "border-[#1173d4] text-[#1173d4]" : "text-[#111418]"
      } hover:bg-[#f6f7f8] dark:border-[#36414a] dark:text-[#f0f2f4]`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
      <span className="text-[#617589] dark:text-[#90a4b7]">
        {formatNumber(count)}
      </span>
    </Button>
  );
}

function PriorityBadge({ level }: { level: Topic["priority"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${priorityStyles[level]}`}
    >
      Prioridade {level}
    </span>
  );
}

function StatusBadge({
  kind,
  label,
}: {
  kind: keyof typeof statusStyles;
  label: string;
}) {
  const icon =
    kind === "progress" ? (
      <Loader2 className="size-4 animate-spin" />
    ) : kind === "politician" ? (
      <Megaphone className="size-4" />
    ) : (
      <Ban className="size-4" />
    );

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${statusStyles[kind]}`}
    >
      {icon}
      {label}
    </span>
  );
}

function ContactsList({
  contacts,
}: {
  contacts: NonNullable<Topic["contacts"]>;
}) {
  return (
    <div className="border-t border-[#e5e7eb] dark:border-[#36414a]">
      <div className="space-y-4 p-6">
        <h3 className="text-sm font-bold text-[#111418] dark:text-[#f0f2f4]">
          Contatos dos responsáveis
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row">
          {contacts.map((contact) => (
            <div
              key={contact.title}
              className="space-y-1 text-sm text-[#617589] dark:text-[#90a4b7]"
            >
              <p className="font-semibold text-[#111418] dark:text-[#f0f2f4]">
                {contact.title}
              </p>
              {contact.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentsSection({
  comments,
  comment,
  onChange,
  onSubmit,
  currentUserName,
}: {
  comments: Topic["comments"];
  comment: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  currentUserName: string;
}) {
  return (
    <div className="border-t border-[#e5e7eb] dark:border-[#36414a]">
      <div className="space-y-4 p-6">
        <h3 className="text-sm font-bold text-[#111418] dark:text-[#f0f2f4]">
          Comentários ({comments.length})
        </h3>
        <div className="space-y-4">
          {comments.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3">
              <div
                className={`flex size-8 items-center justify-center rounded-full font-semibold ${
                  entry.accent ?? "bg-[#1173d4]/10 text-[#1173d4]"
                }`}
              >
                {entry.author.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-[#111418] dark:text-[#f0f2f4]">
                  {entry.author.name}
                </p>
                <p className="text-xs text-[#90a4b7]">
                  {formatRelativeDay(entry.createdAt)}
                </p>
                <p className="text-sm text-[#617589] dark:text-[#90a4b7]">
                  {entry.text}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#e5e7eb] text-[#617589] dark:bg-[#243244] dark:text-[#90a4b7]">
              <User className="size-4" />
            </div>
            <div className="flex-1 space-y-2">
              <textarea
                className="h-24 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111418] placeholder:text-[#617589] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#101922] dark:text-[#f0f2f4]"
                placeholder="Adicionar um comentário..."
                value={comment}
                onChange={(event) => onChange(event.target.value)}
              />
              <div className="flex items-center justify-between text-xs text-[#90a4b7]">
                <span>Comentando como {currentUserName}</span>
                <Button
                  className="h-9 rounded-lg bg-[#1173d4] px-3 font-semibold text-white hover:bg-[#0f65bb]"
                  type="button"
                  onClick={onSubmit}
                  disabled={!comment.trim()}
                >
                  Comentar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
