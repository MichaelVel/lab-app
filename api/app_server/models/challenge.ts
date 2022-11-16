import {InferSchemaType, Schema, model } from 'mongoose';

const contextSchema = new Schema({
    mainTopic: { type: String, required: true },
    labels: [String],
    description: { type: String, required: true }
});

const instructionSchema = new Schema({
    steps: { type: [String], required: true },
    materials: { type: [String], required:true },
    submition: { type: String }
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
