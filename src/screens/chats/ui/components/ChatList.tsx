import { Fragment } from "react";
import { ChatItem } from "../../model/types";
import { ChatCard } from "./ChatCard";

type ChatListProps = {
  items: ChatItem[];
  onPressItem?: (item: ChatItem) => void;
};

export const ChatList = ({ items, onPressItem }: ChatListProps) => {
  return (
    <>
      {items.map((item) => (
        <Fragment key={item.id}>
          <ChatCard item={item} onPress={onPressItem} />
        </Fragment>
      ))}
    </>
  );
};
