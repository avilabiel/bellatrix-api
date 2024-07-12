import UserRepositoryInMemory from "@/externals/database/in-memory/user-repository-in-memory";
// import ...

export default {
  repositories: {
    userRepository: new UserRepositoryInMemory(),
  },
};
