import type { PrismaClient, TrainingProject } from '../../generated/client/client.js';
import { HttpError } from '../errors.js';

export async function findReadableTraining(prisma: PrismaClient, trainingId: string, userId: string) {
  const project = await prisma.trainingProject.findUnique({ where: { id: trainingId } });
  if (!project || (project.ownerId !== userId && project.status !== 'PUBLISHED')) {
    throw new HttpError(404, 'NOT_FOUND', 'Training was not found.');
  }
  return project;
}

export function assertProjectOwner(project: Pick<TrainingProject, 'ownerId'>, userId: string): void {
  if (project.ownerId !== userId) throw new HttpError(404, 'NOT_FOUND', 'Training was not found.');
}

export async function findOwnedTraining(prisma: PrismaClient, trainingId: string, userId: string) {
  const project = await prisma.trainingProject.findUnique({ where: { id: trainingId } });
  if (!project || project.ownerId !== userId) throw new HttpError(404, 'NOT_FOUND', 'Training was not found.');
  return project;
}

export async function findSessionAccess(prisma: PrismaClient, sessionId: string, userId: string) {
  const session = await prisma.trainingSession.findUnique({
    where: { id: sessionId },
    include: { project: { select: { id: true, ownerId: true, title: true, status: true } } },
  });
  if (!session || (session.learnerId !== userId && session.project.ownerId !== userId)) {
    throw new HttpError(404, 'NOT_FOUND', 'Training session was not found.');
  }
  return session;
}

export function assertStepIdSet(requestedIds: string[], existingIds: string[]): void {
  if (requestedIds.length !== existingIds.length || new Set(requestedIds).size !== requestedIds.length) {
    throw new HttpError(400, 'INVALID_STEP_ORDER', 'Provide every step ID exactly once.');
  }
  const existing = new Set(existingIds);
  if (requestedIds.some((id) => !existing.has(id))) {
    throw new HttpError(400, 'INVALID_STEP_ORDER', 'The requested order contains an unknown step ID.');
  }
}