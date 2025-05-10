import { createMachine, interpret, assign } from "xstate";
import httpServer from "../httpServer";
import type { IncomingMessage, ServerResponse } from "http";
import { z } from "zod";

const UserZodObject = z.object({
  name: z.string().max(10),
  age: z.number().min(0).max(100),
  email: z.string().email(),
})
type UserSchema = z.infer<typeof UserZodObject>;

enum StateEnum {
  ReceiveHttpRequest = "ReceiveHttpRequest",
  UrlCheckSuccess = "UrlCheckSuccess",
  UrlCheckFailed = "UrlCheckFailed",
  MethodCheckSuccess = "MethodCheckSuccess",
  MethodCheckFailed = "MethodCheckFailed",
  AuthCheckSuccess = "AuthCheckSuccess",
  AuthCheckFailed = "AuthCheckFailed",
  PermissionCheckSuccess = "PermissionCheckSuccess",
  PermissionCheckFailed = "PermissionCheckFailed",
  ContentTypeCheckSuccess = "ContentTypeCheckSuccess",
  ContentTypeCheckFailed = "ContentTypeCheckFailed",
  BodyProcessSuccess = "BodyProcessSuccess",
  BodyProcessFailed = "BodyProcessFailed",
  ZodCheckSuccess = "ZodCheckSuccess",
  ZodCheckFailed = "ZodCheckFailed"
}

// enum EventEnum {
//   MatchReqUrlEvent = "MatchReqUrlEvent"
// }

enum ServiceEnum {
  asyncAuthCheck = "asyncAuthCheck",
  asyncPermissionCheck = "asyncPermissionCheck",
  asyncBodyProcess = "asyncBodyProcess"
}

// <
//   TContext,
//   TEvent extends EventObject = AnyEventObject,
//   TTypestate extends Typestate<TContext> = {
//     value: any;
//     context: TContext;
//   },
//   TServiceMap extends ServiceMap = ServiceMap,
//   TTypesMeta extends TypegenConstraint = TypegenDisabled
// >

type UserApiMachineContext = {
  req: IncomingMessage;
  res: ServerResponse;
  reqBody: UserSchema;
  zodParseResult: ReturnType<typeof UserZodObject.safeParse>
};

// type UserApiMachineEvent = { type: EventEnum.MatchReqUrlEvent };

// type UserApiMachineServiceMap = {
//   asyncAuthCheck: { data: any }
// }

export const userApiMachine = createMachine<UserApiMachineContext>({
  context: {
    req: {},
    res: {},
    reqBody: {},
    zodParseResult: {}
  } as UserApiMachineContext,
  id: "UserApiMachine",
  initial: StateEnum.ReceiveHttpRequest,
  predictableActionArguments: true,
  states: {
    [StateEnum.ReceiveHttpRequest]: {
      always: [
        {
          target: StateEnum.UrlCheckSuccess,
          cond: (context, event, guardMeta) => {
            console.log({ context, event, guardMeta });
            return context.req.url === "/users";
          }
        },
        {
          target: StateEnum.UrlCheckFailed
        }
      ]
    },
    [StateEnum.UrlCheckFailed]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        context.res.writeHead(404).end(StateEnum.UrlCheckFailed);
      }
    },
    [StateEnum.UrlCheckSuccess]: {
      always: [
        {
          target: StateEnum.MethodCheckSuccess,
          cond: (context, event, guardMeta) => {
            console.log({ context, event, guardMeta });
            return context.req.method?.toLowerCase() === "post";
          }
        },
        {
          target: StateEnum.MethodCheckFailed
        }
      ]
    },
    [StateEnum.MethodCheckFailed]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        context.res.writeHead(405).end(StateEnum.MethodCheckFailed);
      }
    },
    [StateEnum.MethodCheckSuccess]: {
      invoke: {
        src: ServiceEnum.asyncAuthCheck,
        onDone: {
          target: StateEnum.AuthCheckSuccess
        },
        onError: {
          target: StateEnum.AuthCheckFailed
        }
      }
    },
    [StateEnum.AuthCheckFailed]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        context.res.writeHead(401).end(StateEnum.AuthCheckFailed);
      }
    },
    [StateEnum.AuthCheckSuccess]: {
      invoke: {
        src: ServiceEnum.asyncPermissionCheck,
        onDone: {
          target: StateEnum.PermissionCheckSuccess
        },
        onError: {
          target: StateEnum.PermissionCheckFailed
        }
      }
    },
    [StateEnum.PermissionCheckFailed]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        context.res.writeHead(403).end(StateEnum.PermissionCheckFailed);
      }
    },
    [StateEnum.PermissionCheckSuccess]: {
      always: [
        {
          target: StateEnum.ContentTypeCheckSuccess,
          cond: (context, event, guardMeta) => {
            console.log({ context, event, guardMeta });
            return Boolean(context.req.headers["content-type"]?.startsWith("application/json"));
          }
        },
        {
          target: StateEnum.ContentTypeCheckFailed
        }
      ]
    },
    [StateEnum.ContentTypeCheckFailed]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        context.res.writeHead(415).end(StateEnum.ContentTypeCheckFailed);
      }
    },
    [StateEnum.ContentTypeCheckSuccess]: {
      invoke: {
        src: ServiceEnum.asyncBodyProcess,
        onDone: {
          target: StateEnum.BodyProcessSuccess
        },
        onError: {
          target: StateEnum.BodyProcessFailed
        }
      }
    },
    [StateEnum.BodyProcessFailed]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        context.res.writeHead(400).end(StateEnum.BodyProcessFailed);
      }
    },
    [StateEnum.BodyProcessSuccess]: {
      entry: assign({ zodParseResult: (context) => UserZodObject.safeParse(context.reqBody) }),
      always: [
        {
          target: StateEnum.ZodCheckSuccess,
          cond: (context, event, guardMeta) => {
            console.log({ context, event, guardMeta });
            return context.zodParseResult.success;
          }
        },
        {
          target: StateEnum.ZodCheckFailed
        }
      ]
    },
    [StateEnum.ZodCheckFailed]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        console.log(context.zodParseResult.error);
        context.res.writeHead(400).end(StateEnum.ZodCheckFailed);
      }
    },
    // todo-yusheng insert DB
    [StateEnum.ZodCheckSuccess]: {
      type: "final",
      entry: (context, event, actionMeta) => {
        console.log({ context, event, actionMeta });
        context.res.writeHead(200).end(StateEnum.ZodCheckSuccess);
      }
    }
  }
}).withConfig({
  services: {
    [ServiceEnum.asyncAuthCheck]: async (context, event, invokeMeta) => {
      const authorization = context.req.headers.authorization;
      if (!authorization) return Promise.reject();

      // todo-yusheng do some auth check
    },
    [ServiceEnum.asyncPermissionCheck]: async (context, event, invokeMeta) => {
      const authorization = context.req.headers.authorization;
      if (!authorization) return Promise.reject();

      // todo-yusheng do some permission check
    },
    [ServiceEnum.asyncBodyProcess]: async (context, event, invokeMeta) => new Promise<boolean>((resolve, reject) => {
      const chunks: Buffer[] = [];
      context.req.on('data', (chunk) => { chunks.push(chunk) });
      context.req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        context.reqBody = safeJsonParse(buffer.toString('utf-8'));
        resolve(true);
      });
      context.req.on('error', (err) => {
        console.log(err);
        reject(false);
      })
    }),
  }
})

function safeJsonParse (jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
}

httpServer.on('request', function requestListener(req, res) {
  const machineInstance = userApiMachine.withContext({
    req,
    res,
    reqBody: {},
    zodParseResult: {}
  } as UserApiMachineContext);
  const actor = interpret(machineInstance);
  actor.start();
});