import { serve } from 'https://deno.land/std@0.155.0/http/server.ts';

const handler = async (req: Request): Promise<Response> => {
    const { pathname } = new URL(req.url);

    if (req.method === 'GET') {
        if (pathname === '/') {
            const content = await Deno.readFile('./public/html/index.html');

            return new Response(content, {
                status: 200,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                }
            });
        } else if (pathname.match(/.css$/)) {
            const content = await Deno.readFile(`./public/css${pathname}`);
            return new Response(content, {
                status: 200,
                headers: { 'Content-Type': 'text/css' }
            });
        } else {
            return new Response('Not Found', { status: 404 });
        }
    } else if (req.method === 'POST') {
        const body = await req.text();
        console.log(body);

        return new Response('Petición POST', { status: 200 });
    } else {
        return new Response('Otro tipo de método', { status: 500 });
    }

}

await serve(handler, {
    port: 8080
});