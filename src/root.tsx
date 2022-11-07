import { component$, useStyles$ } from '@builder.io/qwik';
import Todos from './components/todos/todos';

import globalStyles from './global.css?inline';

export default component$(() => {
    /**
     * The root of a QwikCity site always start with the <QwikCity> component,
     * immediately followed by the document's <head> and <body>.
     *
     * Dont remove the `<head>` and `<body>` elements.
     */
    useStyles$(globalStyles);

    return (
        <>
            <head>
                <meta charSet='utf-8' />
                <link rel='manifest' href='/manifest.json' />
            </head>
            <body lang='en'>
                <Todos />
            </body>
        </>
    );
});
