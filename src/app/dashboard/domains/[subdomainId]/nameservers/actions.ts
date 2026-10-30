"use server";

const retired = { error: "Nameserver delegation has been retired. Use managed DNS records instead." };

export async function addNameserverAction(_subdomainId: string, _state: unknown, _fd: FormData) { return retired; }
export async function removeNameserverAction(_subdomainId: string, _nsId: string, _state: unknown, _fd?: FormData) { return retired; }
export async function switchBackAction(_subdomainId: string, _state: unknown, _fd?: FormData) { return retired; }
