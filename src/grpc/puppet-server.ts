import {
  IPuppetServer,
  PuppetService,
}                     from '@chatie/grpc'

import {
  log,
}         from '../config'

export class GrpcPuppetServer implements IPuppetServer {
  constructor (
  ) {
    log.verbose('GrpcPuppetServer')
  }

  public selfId (
    call: grpc.ServerUnaryCall<Empty>,
    callback: grpc.sendUnaryData<Id>,
  ): void {

    const id = new Id()
    id.setId('fadsfdsaf')
    callback(null, id)
  }

  public start (
    call: grpc.ServerUnaryCall<Empty>,
    callback: grpc.sendUnaryData<Empty>,
  ): void {
    const empty = new Empty()
    callback(null, empty)
  }

  public stop (
    call: grpc.ServerUnaryCall<Empty>,
    callback: grpc.sendUnaryData<Empty>,
  ): void {
    const empty = new Empty()
    callback(null, empty)
  }

  public contactPayload (
    call: grpc.ServerUnaryCall<Id>,
    callback: grpc.sendUnaryData<ContactPayload>,
  ): void {
    const contactPayload = new ContactPayload()
    contactPayload.setId('xxx')
    contactPayload.setName('yyy')
    callback(null, contactPayload)
  }

  public contactList (
    call: grpc.ServerUnaryCall<Empty>,
    callback: grpc.sendUnaryData<ContactList>,
  ): void {
    const contactList = new ContactList()

    const id = new Id()
    id.setId('xxxid')

    contactList.addId(id)

    callback(null, contactList)
  }

  // getBooks(call: grpc.ServerDuplexStream<GetBookRequest, Book>) {
  //     call.on("data", (request: GetBookRequest) => {
  //         const reply = new Book();
  //         reply.setTitle(`Book${request.getIsbn()}`);
  //         reply.setAuthor(`Author${request.getIsbn()}`);
  //         reply.setIsbn(request.getIsbn());
  //         log(`[getBooks] Write: ${JSON.stringify(reply.toObject())}`);
  //         call.write(reply);
  //     });
  //     call.on("end", () => {
  //         log("[getBooks] Done.");
  //         call.end();
  //     });
  // };

  // getBooksViaAuthor(call: grpc.ServerWriteableStream<GetBookViaAuthor>) {
  //     log(`[getBooksViaAuthor] Request: ${JSON.stringify(call.request.toObject())}`);
  //     for (let i = 1; i <= 10; i++) {
  //         const reply = new Book();
  //         reply.setTitle(`Book${i}`);
  //         reply.setAuthor(call.request.getAuthor());
  //         reply.setIsbn(i);
  //         log(`[getBooksViaAuthor] Write: ${JSON.stringify(reply.toObject())}`);
  //         call.write(reply);
  //     }
  //     log("[getBooksViaAuthor] Done.");
  //     call.end();
  // };

  // getGreatestBook(call: grpc.ServerReadableStream<GetBookRequest>, callback: grpc.sendUnaryData<Book>) {
  //     let lastOne: GetBookRequest;
  //     call.on("data", (request: GetBookRequest) => {
  //         log(`[getGreatestBook] Request: ${JSON.stringify(request.toObject())}`);
  //         lastOne = request;
  //     });
  //     call.on("end", () => {
  //         const reply = new Book();
  //         reply.setIsbn(lastOne.getIsbn());
  //         reply.setTitle("LastOne");
  //         reply.setAuthor("LastOne");
  //         log(`[getGreatestBook] Done: ${JSON.stringify(reply.toObject())}`);
  //         callback(null, reply);
  //     });
  // };
}

const server = new grpc.Server()

server.addService(BookServiceService, new ServerImpl())
server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
server.start()

this.puppetServer = server


process.on("uncaughtException", (err) => {
  log(`process on uncaughtException error: ${err}`);
});

process.on("unhandledRejection", (err) => {
  log(`process on unhandledRejection error: ${err}`);
});