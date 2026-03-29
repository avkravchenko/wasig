import { Fragment } from "react";
import { ChatItem } from "../../model/types";
import { ChatCard } from "./ChatCard";

type ChatListProps = {
  items: ChatItem[];
};

export const ChatList = ({ items }: ChatListProps) => {
  return (
    <>
      {items.map((item) => (
        <Fragment key={item.id}>
          <ChatCard item={item} />
        </Fragment>
      ))}
    </>
  );
};
