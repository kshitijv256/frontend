import { PollModel } from "@/components/posts/models";

const PollCard = (poll: PollModel) => {
  return (
    <div>
      <p>{poll.title}</p>
      <p>{poll.content}</p>
    </div>
  );
};

export default PollCard;
