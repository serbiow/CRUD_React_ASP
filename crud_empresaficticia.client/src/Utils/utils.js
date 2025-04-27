export function aplicarMascaraTelefone(valor) {
    if (!valor) return "";

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Se tiver mais que 11 dígitos, corta
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 10) {
        // Celular: (00) 00000-0000
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (valor.length > 6) {
        // Fixo: (00) 0000-0000
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
        valor = valor.replace(/^(\d*)/, "($1");
    }

    return valor;
}

export function aplicarMascaraCNPJ(valor) {
    if (!valor) return "";

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita para no máximo 14 dígitos
    if (valor.length > 14) valor = valor.slice(0, 14);

    // Aplica a máscara: 00.000.000/0000-00
    valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
    valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");

    return valor;
}