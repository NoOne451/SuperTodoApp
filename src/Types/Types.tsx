export type projectType = {
  id: number;
  title: string;
  discription: string;
  date: string;
  tasks: string[];
};
export type dataType = {
  selectedProject: null | string | number;
  projects: projectType[];
};
