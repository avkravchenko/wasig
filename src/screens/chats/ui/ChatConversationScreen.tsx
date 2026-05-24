import { useEffect, useMemo, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ClipIcon from "../../../../assets/icons/clip.svg";
import { getChatThreadById } from "../model/mocks";
import {
  CHAT_CONVERSATION_ROUTE,
  ChatConversationRouteParams,
  ChatMessage,
} from "../model/types";
import { ChatAvatar } from "./components/ChatAvatar";

const KEYBOARD_COMPOSER_GAP = 4;

type ChatConversationScreenProps = NativeStackScreenProps<
  ChatConversationRouteParams,
  typeof CHAT_CONVERSATION_ROUTE
>;

const getStatusMark = (status?: ChatMessage["status"]) => {
  if (status === "read") {
    return "✓✓";
  }

  if (status === "sending") {
    return "◔";
  }

  return "✓";
};

const ChatConversationScreen = ({
  navigation,
  route,
}: ChatConversationScreenProps) => {
  const insets = useSafeAreaInsets();
  const thread = useMemo(
    () => getChatThreadById(route.params.chatId),
    [route.params.chatId]
  );

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(thread?.messages ?? []);

  useEffect(() => {
    setMessages(thread?.messages ?? []);
  }, [thread]);

  if (!thread) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>Чат не найден</Text>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Назад к списку</Text>
        </Pressable>
      </View>
    );
  }

  const composerBottomPadding = Math.max(insets.bottom, 8);
  const keyboardVerticalOffset = KEYBOARD_COMPOSER_GAP - composerBottomPadding;

  const handleSend = () => {
    const value = draft.trim();

    if (!value) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `draft-${current.length + 1}`,
        text: value,
        time: "Сейчас",
        isOutgoing: true,
        status: "sending",
      },
    ]);
    setDraft("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable
          style={styles.headerIconButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerIcon}>‹</Text>
        </Pressable>

        <View style={styles.headerCenter}>
          <ChatAvatar
            kind={thread.avatarKind}
            label={thread.avatarLabel}
            size={42}
          />
          <View>
            <Text style={styles.headerTitle}>{thread.name}</Text>
            <Text style={styles.headerStatus}>
              {thread.isOnline ? "online" : "был(а) недавно"}
            </Text>
          </View>
        </View>

        <Pressable style={styles.headerIconButton}>
          <Text style={styles.headerDots}>•••</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.messagesScroll}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dayLabel}>Сегодня</Text>

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.isOutgoing ? styles.messageRowOutgoing : styles.messageRowIncoming,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isOutgoing ? styles.messageBubbleOutgoing : styles.messageBubbleIncoming,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isOutgoing
                    ? styles.messageTextOutgoing
                    : styles.messageTextIncoming,
                ]}
              >
                {message.text}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.messageMeta}>{message.time}</Text>
                {message.isOutgoing ? (
                  <Text style={styles.messageMeta}>{getStatusMark(message.status)}</Text>
                ) : null}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View
        style={[
          styles.composerWrap,
          { paddingBottom: composerBottomPadding },
        ]}
      >
        <View style={styles.composer}>
          <ClipIcon width={20} height={20} style={styles.attachment} />
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Какой-то текст"
            placeholderTextColor="#8A90A3"
            style={styles.input}
            multiline
          />
        </View>

        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>➤</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    gap: 16,
  },
  fallbackTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#30323E",
  },
  backButton: {
    backgroundColor: "#3D3D47",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  headerIconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    fontSize: 30,
    lineHeight: 30,
    color: "#8A90A3",
    marginTop: -2,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    color: "#4A4C59",
  },
  headerStatus: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
    color: "#8BA96D",
  },
  headerDots: {
    fontSize: 18,
    lineHeight: 18,
    color: "#8A90A3",
    letterSpacing: 1,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  dayLabel: {
    alignSelf: "center",
    marginBottom: 26,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: "#8E8DA8",
  },
  messageRow: {
    width: "100%",
    marginBottom: 14,
  },
  messageRowIncoming: {
    alignItems: "flex-start",
  },
  messageRowOutgoing: {
    alignItems: "flex-end",
  },
  messageBubble: {
    maxWidth: "84%",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  messageBubbleIncoming: {
    backgroundColor: "#F1F3F8",
    borderBottomLeftRadius: 12,
  },
  messageBubbleOutgoing: {
    backgroundColor: "#3D3D47",
    borderBottomRightRadius: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextIncoming: {
    color: "#30323E",
  },
  messageTextOutgoing: {
    color: "#FFFFFF",
  },
  metaRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 6,
  },
  messageMeta: {
    fontSize: 12,
    lineHeight: 16,
    color: "#A8AABC",
    fontWeight: "500",
  },
  composerWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
  },
  composer: {
    flex: 1,
    minHeight: 52,
    maxHeight: 120,
    borderRadius: 28,
    backgroundColor: "#F1F3F8",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  attachment: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#3D3D47",
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: 96,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#3D3D47",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 22,
    marginLeft: 2,
  },
});

export default ChatConversationScreen;
