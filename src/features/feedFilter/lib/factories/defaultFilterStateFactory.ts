const defaultFilterStateFactory = () => {
  return {
    search: "",
    townId: null,
    hobbyIds: [],
    meetingGoals: [],
    onlyWithPhoto: false,
  };
};

export default defaultFilterStateFactory;
