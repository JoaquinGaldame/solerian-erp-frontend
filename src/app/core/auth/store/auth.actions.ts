import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Requested': props<{ payload: LoginRequest }>(),
    'Login Success': props<{ response: LoginResponse }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Restore Session': emptyProps()
  }
});
