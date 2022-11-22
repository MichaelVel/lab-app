
export interface IChallenge {
  _id: string; 
  userId: string;
  name: string;
  state: string;
  isPublic: boolean;
  allowAnswers: boolean;
  context: { 
    mainTopic: string;
    labels: string[];
    description: string;
  };
  instructions: {
    steps: string[];
    materials: string[];
    submition: string;
  };
  explanation: {
    resource: File;
  }

}

export class Challenge implements Partial<IChallenge> {
  _id: string = "";
  userId: string = "";
  name: string = "";
  state: string = "draft";
  isPublic: boolean = true;
  allowAnswers: boolean = false;
  context = { 
    mainTopic: "",
    labels: ["Nuevo Tema"],
    description: "",
  };
  instructions = {
    steps: [],
    materials: [],
    submition: "",
  };
  explanation?: {
    resource: File;
  }
  constructor(userId: string) {
    this.userId = userId;
  }
}
