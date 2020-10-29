/*
    定义store 的value
 */
export interface RootStore {
    name:string
}

/**
 * 初始化默认的store
 */
const InitStore:RootStore = {
  name: '',
};

export default InitStore;
