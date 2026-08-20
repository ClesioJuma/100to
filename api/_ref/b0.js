// Soluções de referência do Bloco 0 (Fundamentos da linguagem).
// Este ficheiro nunca é servido ao browser: só é importado pela
// serverless function /api/corrigir.js, em runtime, no servidor.
// Não exporta nenhum handler HTTP, por isso o Vercel não o transforma
// numa rota pública.

module.exports = {
  0: {
    resposta: `go version
go mod init github.com/exemplo/projeto`,
    pontosChave: [
      "corre go version para confirmar a instalação",
      "corre go mod init com um nome de módulo para criar o go.mod",
    ],
  },
  1: {
    resposta: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World")
}`,
    pontosChave: [
      "package main e func main() presentes",
      "usa fmt.Println para imprimir",
      "explica a diferença entre go run (compila, corre, apaga o binário) e go build (gera um binário que fica no disco)",
    ],
  },
  2: {
    resposta: `var x int = 5
var y = 5
z := 5`,
    pontosChave: [
      "usa as 3 formas: var com tipo explícito, var com tipo inferido, := short declaration",
      "explica que := só funciona dentro de funções",
      "explica que var é preferível quando se quer o valor zero ou tipo explícito",
    ],
  },
  3: {
    resposta: `var i int = 1
var f float64 = 1.5
var s string = "texto"
var b bool = true
var r rune = 'a'
var by byte = 255

fmt.Printf("%T\\n", i)
fmt.Printf("%T\\n", f)
fmt.Printf("%T\\n", s)
fmt.Printf("%T\\n", b)
fmt.Printf("%T\\n", r)
fmt.Printf("%T\\n", by)`,
    pontosChave: [
      "declara uma variável de cada tipo: int, float64, string, bool, rune, byte",
      "usa %T no Printf para imprimir o tipo de cada uma",
    ],
  },
  4: {
    resposta: `const Pi = 3.14

const (
    Domingo = iota
    Segunda
    Terca
    Quarta
    Quinta
    Sexta
    Sabado
)`,
    pontosChave: [
      "usa const para uma constante simples",
      "usa um bloco const ( ... ) com iota a gerar uma sequência",
    ],
  },
  5: {
    resposta: `fmt.Println(7 / 2)         // 3, divisão inteira
fmt.Println(7.0 / 2.0)     // 3.5, divisão com float64
fmt.Println(7 % 2)         // 1, resto
fmt.Println(3 == 3, 3 != 4, 3 < 4, 3 > 4)
fmt.Println(true && false, true || false)`,
    pontosChave: [
      "mostra a diferença entre 7 / 2 (divisão inteira, dá 3) e 7.0 / 2.0 ou float64(7) / float64(2) (divisão com float64, dá 3.5)",
      "usa pelo menos um operador de comparação e um lógico",
    ],
  },
  6: {
    resposta: `n := calcular()
if n > 0 {
    fmt.Println("positivo")
} else {
    fmt.Println("não positivo")
}

if n := calcular(); n > 0 {
    fmt.Println("positivo, com inicialização no próprio if")
}`,
    pontosChave: [
      "usa if/else normal",
      "usa a forma if x := algo(); condição { ... } com inicialização",
      "idealmente menciona que este padrão é comum na verificação de erros (if err := f(); err != nil)",
    ],
  },
  7: {
    resposta: `switch {
case n < 0:
    fmt.Println("negativo")
case n == 0:
    fmt.Println("zero")
default:
    fmt.Println("positivo")
}

switch dia {
case 1:
    fmt.Println("segunda")
case 2:
    fmt.Println("terça")
default:
    fmt.Println("outro dia")
}`,
    pontosChave: [
      "usa switch sem expressão (equivalente a if/else if)",
      "usa switch com um valor a comparar",
    ],
  },
  8: {
    resposta: `for i := 0; i < 10; i++ {
    fmt.Println(i)
}

i := 0
for i < 10 {
    fmt.Println(i)
    i++
}

for {
    if i >= 10 {
        break
    }
    i++
}`,
    pontosChave: [
      "for clássico com inicialização, condição e incremento",
      "for só com condição (equivalente a while)",
      "for infinito interrompido com break",
    ],
  },
  9: {
    resposta: `func dividir(a, b int) (int, int) {
    return a / b, a % b
}`,
    pontosChave: [
      "assinatura com dois parâmetros int e dois retornos int",
      "devolve quociente e resto",
    ],
  },
  10: {
    resposta: `func dividir(a, b int) (q, r int) {
    q = a / b
    r = a % b
    return
}`,
    pontosChave: [
      "usa named return values (q, r int) na assinatura",
      "usa return sem argumentos no fim",
    ],
  },
  11: {
    resposta: `func soma(numeros ...int) int {
    total := 0
    for _, n := range numeros {
        total += n
    }
    return total
}`,
    pontosChave: [
      "parâmetro variádico ...int",
      "percorre os valores recebidos e soma-os",
    ],
  },
  12: {
    resposta: `x := 10
fmt.Println(&x)

p := &x
*p = 20
fmt.Println(x)`,
    pontosChave: [
      "imprime o endereço de uma variável com &",
      "cria um ponteiro para ela",
      "altera o valor através do ponteiro com *p = ...",
      "confirma que a variável original mudou",
    ],
  },
  13: {
    resposta: `func Dobrar(n *int) {
    *n = *n * 2
}

func DobrarValor(n int) int {
    return n * 2
}`,
    pontosChave: [
      "Dobrar recebe um ponteiro e altera o valor original através dele",
      "DobrarValor recebe por valor e devolve o dobro sem alterar o original",
    ],
  },
  14: {
    resposta: `gofmt -l .
gofmt -w .`,
    pontosChave: [
      "corre gofmt -l . para listar ficheiros mal formatados",
      "corre gofmt -w . para os corrigir automaticamente",
    ],
  },
};
