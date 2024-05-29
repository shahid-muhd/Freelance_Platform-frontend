import { Project } from '@/utils/types/types';
import { create } from 'zustand'


interface ProjectStore {
  projects: Project[];
  addProjects: (projects: Project[]) => void;
  removeProject: (projectId: number) => void;
  updateProject: (updatedProject: Project) => void;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProjects: (projects) => set({ projects }),
  removeProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
  updateProject: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      ),
    })),
}));

export default useProjectStore;
