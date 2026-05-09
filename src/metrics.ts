import { Counter, register } from "prom-client";

export const dictoinariesRequestCounter = new Counter({
    name: "dictoinaries_request_counter",
    help: "My custom counter for dictoinaries-request counting",
    labelNames: ["endpoint"],
});

// Регистрируем в реестре
register.registerMetric(dictoinariesRequestCounter);
