import {InferSchemaType, Schema, model } from 'mongoose';

const contextSchema = new Schema({
    mainTopic: String,
    labels: [String],
    description: String
});

const instructionSchema = new Schema({
    steps: [String],
    materials: [String],
    submition: String 
});

const explanationSchema = new Schema({
    resource: Schema.Types.Buffer
});

const challengeSchema = new Schema({
    name: { 
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    state: { 
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    allowAnswers: {
      type: Boolean,
      required: true,
    },
    creationDate: {
      type: Date,
      default: () => new Date(),
    },
    context: contextSchema,
    instructions: instructionSchema,
    explanation: explanationSchema,
});

type IChallenge = InferSchemaType<typeof challengeSchema>;

export const Challenge = model<IChallenge>('Challenge', challengeSchema); 
