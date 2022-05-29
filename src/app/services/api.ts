export * from './admin.service';
import { AdminService } from './admin.service';
export * from './quiz.service';
import { QuizService } from './quiz.service';
export const APIS = [AdminService, QuizService];
