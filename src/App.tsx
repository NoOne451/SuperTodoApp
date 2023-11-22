import { useReducer } from 'react';
import SideBar from './Components/SideBar';
import AddProject from './Components/AddProject';
import NoProject from './Components/NoProject';
import ProjectPage from './Components/ProjectPage';
import { dataType, projectType } from './Types/Types';
import { ToastContainer } from 'react-toastify';
function App() {
  type actionType = {
    type:
      | 'changeProject'
      | 'addProject'
      | 'removeProject'
      | 'addTask'
      | 'removeTask'
      | 'updateTask'
      | 'updateProject';
    value: any;
  };
  //initial Data for Reducer
  const initialData: dataType = {
    selectedProject: null,
    projects: [],
  };
  //Reducer Function
  function ReducerFunction(state: dataType, action: actionType): dataType {
    if (action.type === 'changeProject') {
      return { ...state, selectedProject: action.value };
    } else if (action.type === 'addProject') {
      return {
        selectedProject: null,
        projects: [...state.projects, action.value],
      };
    } else if (action.type === 'removeProject') {
      return {
        selectedProject: null,
        projects: state.projects.filter(
          (project) => project.id !== action.value
        ),
      };
    } else if (action.type === 'addTask') {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.value.id
      );
      const project = state.projects[projectIndex];
      project.tasks.push(action.value.task);
      state.projects[projectIndex] = project;
      return { ...state, projects: [...state.projects] };
    } else if (action.type == 'removeTask') {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.value.id
      );
      let project = state.projects[projectIndex];
      const tasks = project.tasks.filter((task, index) => {
        index !== action.value.index;
        console.log(task);
      });
      project.tasks = tasks;
      state.projects[projectIndex] = project;
      return { ...state, projects: [...state.projects] };
    } else if (action.type == 'updateTask') {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.value.id
      );
      const project = state.projects[projectIndex];
      project.tasks[action.value.index] = action.value.task;
      state.projects[projectIndex] = project;
      return { ...state, projects: [...state.projects] };
    } else if (action.type == 'updateProject') {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.value.id
      );
      state.projects[projectIndex] = action.value;
      return { selectedProject: projectIndex, projects: [...state.projects] };
    }
    return { ...state };
  }
  const [data, setData] = useReducer(ReducerFunction, initialData);
  //Dynamic content rendering
  let content;

  if (data.selectedProject == 'add') {
    content = (
      <AddProject
        changeToNoProject={changeToNoProject}
        addProject={addProject}
      />
    );
  } else if (data.selectedProject == null) {
    content = <NoProject changeToAddProject={changeToAddProject} />;
  } else if (typeof data.selectedProject == 'number') {
    console.log(data.selectedProject);
    content = (
      <ProjectPage
        {...data.projects[data.selectedProject]}
        removeProject={removeProject}
        addTask={addTask}
        removeTask={removeTask}
        updateTask={updateTask}
        updateProject={updateProject}
      />
    );
  }
  //Switcing pages
  function changeToAddProject() {
    setData({ type: 'changeProject', value: 'add' });
  }

  function changeToNoProject() {
    setData({ type: 'changeProject', value: null });
    return;
  }
  function changeProject(index: number) {
    setData({ type: 'changeProject', value: index });
  }
  //Adding and Removing of Projects
  function addProject(data: projectType) {
    setData({ type: 'addProject', value: data });
  }
  function removeProject(id: number) {
    // console.log(id);
    setData({ type: 'removeProject', value: id });
  }
  function updateProject(data: projectType) {
    setData({ type: 'updateProject', value: data });
  }
  //Adding and Removing of Tasks
  function addTask(task: string, id: number) {
    setData({ type: 'addTask', value: { task: task, id: id } });
  }
  function removeTask(index: number, id: number) {
    setData({ type: 'removeTask', value: { index: index, id: id } });
  }
  function updateTask(task: string, id: number, index: number) {
    // console.log('going to update');
    setData({
      type: 'updateTask',
      value: { task: task, id: id, index: index },
    });
  }
  return (
    <main className="bg-white h-screen w-screen flex flex-col sm:flex-row sm:pt-10 pt-3">
      <ToastContainer />
      <SideBar
        changeToAddProject={changeToAddProject}
        projects={data.projects}
        changeProjectIndex={changeProject}
        activeIndex={data.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
