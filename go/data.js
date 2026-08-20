// 100toGo — eixo Go. Configuração da app e conteúdo das trilhas.
const APP = {
  id: "go",
  nome: "Go",
  tagline: "Do primeiro struct ao sistema distribuído",
  icone: "../golang.png",
  outro: { nome: "Design", href: "../design/" },
};

// Dados das duas trilhas Go — gerados a partir dos ficheiros markdown originais.
const TRILHA_PRINCIPAL = {
  id: "principal",
  titulo: "100 exercícios até à primeira API",
  intro: "Guia progressivo em 13 blocos, dos fundamentos da linguagem ao deploy de uma API REST completa.",
  blocos: [
    {
      id: "b0",
      titulo: "Bloco 0 — Fundamentos da linguagem",
      faixa: "Ex 0.1–0.15",
      descricao: "Tudo o que precisas de saber antes de structs. Se já dominas isto (variáveis, tipos, funções, loops, ponteiros básicos), passa direto ao Bloco 1. Mesmo assim vale a pena confirmares cada ponto, porque Go tem convenções próprias que diferem de outras linguagens.",
      recursos: [
        { label: "Tour of Go — Basics", url: "https://go.dev/tour/basics/1" },
        { label: "Go by Example — Basics", url: "https://gobyexample.com/" },
        { label: "Effective Go — Formatting", url: "https://go.dev/doc/effective_go#formatting" },
        { label: "How to Install Go", url: "https://go.dev/doc/install" },
      ],
      exercicios: [
        "Instala o Go, ou confirma a versão instalada com go version, e cria o teu primeiro go.mod com go mod init.",
        "Escreve um \"Hello, World\" e corre com go run. Depois compila com go build e corre o binário gerado, e repara na diferença entre os dois fluxos.",
        "Declara variáveis das 3 formas possíveis em Go: var x int = 5, var y = 5 com inferência de tipo, e z := 5 como short declaration. Explica por escrito quando usarias cada uma.",
        "Cria uma variável de cada tipo básico: int, float64, string, bool, rune e byte. Imprime o tipo de cada uma com %T no Printf.",
        "Cria constantes com const, incluindo um bloco const ( ... ) que usa iota para gerar uma sequência, por exemplo os dias da semana.",
        "Usa operadores aritméticos, de comparação e lógicos (+ - * / %, == != < > && ||), escrevendo exemplos que mostrem a diferença entre a divisão inteira de 7 / 2 e a divisão com float64.",
        "Usa if/else e a forma de if com inicialização, como if n := calcular(); n > 0 { ... }. Este padrão aparece constantemente em Go, sobretudo na verificação de erros, na forma if err := fazerAlgo(); err != nil { ... }.",
        "Usa switch sem expressão, equivalente a uma cadeia de if/else if, e switch com um valor.",
        "Pratica os 3 formatos de for em Go, já que a linguagem não tem while nem do-while: for i := 0; i < 10; i++, for com apenas uma condição, e for infinito interrompido com break.",
        "Implementa a função dividir(a, b int) (int, int), com múltiplos valores de retorno, que devolve o quociente e o resto.",
        "Reescreve a função anterior como dividir(a, b int) (q, r int), usando named return values, e devolve o resultado só com return, sem argumentos.",
        "Implementa a função variádica soma(numeros ...int) int.",
        "Pratica ponteiros, a base que vais precisar para pointer receivers no Bloco 1: cria uma variável, imprime o seu endereço com &, cria um ponteiro para ela, altera o valor através do ponteiro com *, e confirma que a variável original mudou.",
        "Escreve a função Dobrar(n *int), que recebe um ponteiro e duplica o valor original, e compara com uma versão DobrarValor(n int) int, que devolve o dobro sem alterar o original. É o mesmo princípio que vais aplicar a Concluir() no Bloco 1.",
        "Corre gofmt -l . no teu projeto para listares os ficheiros mal formatados, e depois gofmt -w . para os corrigires automaticamente. Ao contrário da maioria das linguagens, Go tem uma única formatação oficial, e vale a pena adotares isto desde já.",
      ],
      dicas: {
        0: `O go.mod é o ficheiro que identifica o teu projeto como um módulo Go e regista as suas dependências. Corre estes dois comandos na pasta do projeto:

~~~
go version
go mod init nome-do-teu-modulo
~~~

O nome do módulo pode ser qualquer texto, mas é comum usar algo como github.com/o-teu-utilizador/nome-do-projeto, mesmo que nunca chegues a publicar o código.`,

        1: `package main marca este ficheiro como o ponto de entrada de um programa executável, e func main() é a função que corre primeiro.

~~~
package main

import "fmt"

func main() {
    fmt.Println("Hello, World")
}
~~~

go run ficheiro.go compila para um binário temporário, corre-o, e apaga-o a seguir, tudo num só comando. go build ficheiro.go gera um binário que fica no disco, e que depois corres à parte com ./ficheiro.`,

        2: `~~~
var x int = 5   // forma completa, com o tipo explícito
var y = 5       // tipo inferido a partir do valor
z := 5          // short declaration, só dentro de funções
~~~

Usa var quando quiseres deixar o tipo explícito, ou quando precisares da variável antes de lhe dares um valor, porque nesse caso ela fica com o valor zero do tipo. Usa := no dia a dia dentro de funções: é a forma mais comum em código Go idiomático.`,

        3: `~~~
var i int = 10
var f float64 = 3.14
var s string = "texto"
var b bool = true
var r rune = 'A'
var by byte = 255

fmt.Printf("%T %T %T %T %T %T\n", i, f, s, b, r, by)
~~~

rune é só um nome alternativo para int32, e representa um carácter Unicode. byte é um nome alternativo para uint8.`,

        4: `~~~
const (
    Segunda = iota // 0
    Terca           // 1
    Quarta          // 2
    Quinta          // 3
    Sexta           // 4
)
~~~

iota começa em 0 dentro de um bloco const e soma 1 a cada linha nova, mesmo que não o escrevas outra vez.`,

        5: `~~~
fmt.Println(7 / 2)     // 3, divisão inteira: a parte decimal é descartada
fmt.Println(7.0 / 2)   // 3.5, porque pelo menos um dos operandos é float64
fmt.Println(7 % 2)     // 1, o resto da divisão inteira
~~~

Quando os dois operandos de / são inteiros, Go faz divisão inteira e descarta a parte decimal. Para obteres um resultado com casas decimais, pelo menos um dos dois números tem de ser float64.`,

        6: `~~~
if n := calcular(); n > 0 {
    fmt.Println("positivo:", n)
}

if err := fazerAlgo(); err != nil {
    fmt.Println("erro:", err)
}
~~~

A variável declarada antes do ; só existe dentro do if, e do else, se houver. É por isso que este padrão é tão usado com erros: evita que err fique visível fora do bloco onde é tratado.`,

        7: `~~~
switch {
case idade < 12:
    fmt.Println("criança")
case idade < 18:
    fmt.Println("adolescente")
default:
    fmt.Println("adulto")
}

switch dia {
case "sábado", "domingo":
    fmt.Println("fim de semana")
default:
    fmt.Println("dia útil")
}
~~~

O switch sem expressão testa uma condição booleana em cada case, tal como uma cadeia de if/else if. O switch com valor compara esse valor com cada case, e um case pode juntar várias opções separadas por vírgula.`,

        8: `~~~
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

n := 10
for n > 0 {
    n--
}

for {
    if condicaoDeParagem() {
        break
    }
}
~~~

O segundo formato, só com a condição, equivale a um while. O terceiro, sem nada, corre para sempre até encontrar um break.`,

        9: `~~~
func dividir(a, b int) (int, int) {
    return a / b, a % b
}

q, r := dividir(17, 5)
~~~

Uma função em Go pode devolver mais do que um valor, separados por vírgula tanto na assinatura como no return.`,

        10: `~~~
func dividir(a, b int) (q, r int) {
    q = a / b
    r = a % b
    return
}
~~~

q e r já existem, com o valor zero, assim que a função começa a correr. O return sozinho devolve o que estiver guardado neles nesse momento.`,

        11: `~~~
func soma(numeros ...int) int {
    total := 0
    for _, n := range numeros {
        total += n
    }
    return total
}

soma(1, 2, 3) // 6
soma()        // 0
~~~

Dentro da função, numeros comporta-se como um []int normal. Podes chamar a função com quantos argumentos quiseres, incluindo zero.`,

        12: `~~~
x := 5
fmt.Println(&x) // endereço de memória de x

p := &x    // p é um ponteiro para x
*p = 10    // altera o valor de x através do ponteiro

fmt.Println(x) // 10
~~~

& obtém o endereço de uma variável. * usado num ponteiro acede, ou altera, o valor guardado nesse endereço, o que se chama dereferenciar.`,

        13: `~~~
func Dobrar(n *int) {
    *n = *n * 2
}

func DobrarValor(n int) int {
    return n * 2
}

x := 5
Dobrar(&x)           // x passa a ser 10
y := DobrarValor(x)  // x continua 10, y é 20
~~~

Dobrar recebe o endereço de x e altera o valor original através do ponteiro. DobrarValor recebe uma cópia de x, por isso o x original nunca muda, só o valor devolvido.`,

        14: `~~~
gofmt -l .
gofmt -w .
~~~

O primeiro comando lista, sem alterar nada, os ficheiros .go cujo formato não segue a convenção oficial. O segundo aplica essa formatação diretamente. A maioria dos editores, como o VS Code com a extensão de Go, faz isto sozinho sempre que gravas o ficheiro.`,
      },
      livro: `Este capítulo cobre o que qualquer programa Go precisa, antes mesmo de chegares a um struct. Não é um resumo dos 15 exercícios: é o porquê por trás deles, escrito para leres de seguida, sem precisares de saltar para a documentação oficial a meio.

## O ponto de entrada de um programa

Todo o ficheiro Go começa com uma declaração de pacote. Um programa executável, dos que corres diretamente, tem sempre package main num ficheiro que também define func main(), a função por onde a execução arranca.

~~~
package main

import "fmt"

func main() {
    fmt.Println("Hello, World")
}
~~~

Repara em três coisas. Primeiro, package main não é decoração: é o que diz ao compilador "isto produz um binário", ao contrário de um pacote de biblioteca, que outros programas importam mas que nunca corre sozinho. Segundo, import "fmt" traz o pacote de formatação da standard library, e é obrigatório: Go não deixa importar algo e não usar, o compilador recusa-se a compilar. Terceiro, a chaveta de func main() { abre logo na mesma linha; Go tem uma única forma aceite de formatar chavetas, e gofmt trata disso por ti, como vais ver no fim deste capítulo.

go run ficheiro.go compila para um binário temporário, corre-o, e apaga-o a seguir, tudo num único comando, o que é ótimo durante o desenvolvimento. go build ficheiro.go faz só a primeira parte: gera um binário que fica no disco, pronto a ser distribuído ou corrido depois, sem precisar do código-fonte nem do compilador instalado na máquina que o vai correr. Esta é uma das razões por que Go é popular para ferramentas de linha de comandos: um único binário, sem dependências externas a instalar.

## Três formas de declarar uma variável

Go tem três formas de declarar uma variável, e a escolha entre elas não é estética, diz alguma coisa a quem lê o código.

~~~
var x int = 5   // forma completa: tipo explícito, valor explícito
var y = 5       // tipo inferido a partir do valor
z := 5          // short declaration, só dentro de funções
~~~

var x int = 5 é a forma mais explícita, e usa-se sobretudo quando o tipo que queres não é o que Go infere por omissão, ou quando declaras a variável sem lhe dares valor logo (nesse caso, ela fica com o valor zero do tipo: 0 para números, "" para strings, false para bool, nil para ponteiros e interfaces). var y = 5 deixa o compilador inferir o tipo a partir do valor à direita, e usa-se quando o tipo é óbvio pelo contexto. z := 5 é a forma mais usada dentro de funções, e combina declaração com atribuição numa única instrução; não funciona fora de funções, ao nível do pacote, onde só var é permitido.

Na prática, o código Go idiomático usa := quase sempre dentro de funções, e reserva var para os casos em que precisas do tipo explícito, do valor zero, ou de declarar ao nível do pacote.

## Os tipos básicos

~~~
var i int = 10
var f float64 = 3.14
var s string = "texto"
var b bool = true
var r rune = 'A'
var by byte = 255
~~~

int é o inteiro nativo da tua arquitetura, normalmente 64 bits numa máquina moderna, e é o que usas por omissão, a não ser que tenhas uma razão específica para escolheres int32, int64, uint, ou outro dos tipos numéricos com tamanho fixo. float64 é o tipo de vírgula flutuante por omissão; float32 existe, mas raramente compensa a perda de precisão só para poupares memória.

string em Go é uma sequência imutável de bytes, normalmente texto UTF-8. rune é um pseudónimo de int32, e representa um ponto de código Unicode: quando percorres uma string com range, cada elemento que recebes é um rune, não um byte, o que importa assim que o texto tem acentos ou outros carateres fora do ASCII. byte é um pseudónimo de uint8, e é o que obténs ao converteres uma string para []byte.

fmt.Printf("%T", valor) imprime o tipo dinâmico de um valor, e é a forma mais rápida de confirmares que tipo o compilador atribuiu a algo que declaraste com :=.

## Constantes e iota

const declara um valor que não muda depois de definido, e que o compilador consegue verificar em tempo de compilação, ao contrário de uma variável.

~~~
const IVA = 0.16

const (
    Segunda = iota // 0
    Terca           // 1
    Quarta          // 2
    Quinta          // 3
    Sexta           // 4
)
~~~

Dentro de um bloco const ( ... ), iota começa em 0 e soma 1 a cada linha nova, mesmo que não o escrevas explicitamente nas linhas seguintes. É o mecanismo idiomático de Go para sequências deste tipo, dias da semana, estados, níveis, e substitui o que noutras linguagens seria um enum dedicado, que Go não tem como construção própria da linguagem.

## Operadores e o cuidado com a divisão

Os operadores aritméticos, de comparação e lógicos são os habituais: + - * / % para aritmética, == != < > <= >= para comparação, && || ! para lógica. O que apanha muita gente de outras linguagens de guarda é a divisão inteira.

~~~
fmt.Println(7 / 2)     // 3, divisão inteira: a parte decimal é descartada
fmt.Println(7.0 / 2)   // 3.5, porque pelo menos um dos operandos é float64
fmt.Println(7 % 2)     // 1, o resto da divisão inteira
~~~

Quando os dois operandos de / são inteiros, o resultado é sempre inteiro, e a parte decimal é simplesmente descartada, não arredondada. Para obteres um resultado com casas decimais, pelo menos um dos dois números tem de ser float64, e Go não converte isso automaticamente por ti: 7 / 2.0 não compila sequer, se 7 for uma variável declarada como int, porque Go não mistura tipos numéricos diferentes numa operação sem uma conversão explícita.

## Controlo de fluxo: if, switch, for

O if em Go tem uma variante que aparece constantemente em código real: a forma com inicialização.

~~~
if n := calcular(); n > 0 {
    fmt.Println("positivo:", n)
}
~~~

A variável n só existe dentro do if, e do else que o acompanhar, se houver um. Este padrão é tão usado com erros, if err := fazerAlgo(); err != nil { ... }, que vale a pena habituares-te a ele já, porque vai aparecer em praticamente todas as funções que escreveres a partir do Bloco 3.

switch em Go não precisa de break no fim de cada case, ao contrário de C ou Java: cada case termina sozinho, sem cair para o seguinte. Quando precisas mesmo desse comportamento de queda, existe a palavra-chave fallthrough, mas raramente é preciso.

~~~
switch {
case idade < 12:
    fmt.Println("criança")
case idade < 18:
    fmt.Println("adolescente")
default:
    fmt.Println("adulto")
}
~~~

Um switch sem valor a seguir à palavra switch, como o exemplo acima, testa uma condição booleana em cada case, e é equivalente a uma cadeia de if / else if, muitas vezes mais legível.

Go tem um único formato de loop, for, que serve para os três papéis que noutras linguagens seriam for, while e um loop infinito.

~~~
for i := 0; i < 10; i++ { }   // o for clássico, com inicialização, condição e passo
for n > 0 { }                  // só a condição: o equivalente a um while
for { }                        // sem nada: infinito, até um break
~~~

## Funções: retornos múltiplos, nomeados e variádicos

Uma função em Go pode devolver mais do que um valor, o que é usado constantemente para devolver um resultado e um erro lado a lado.

~~~
func dividir(a, b int) (int, int) {
    return a / b, a % b
}

q, r := dividir(17, 5)
~~~

Quando os valores de retorno têm nome na assinatura, chamam-se named return values, e já existem, com o valor zero do respetivo tipo, assim que a função começa a correr.

~~~
func dividir(a, b int) (q, r int) {
    q = a / b
    r = a % b
    return
}
~~~

Um return sozinho, sem argumentos, devolve o que estiver guardado nas variáveis nomeadas nesse momento. Isto compensa quando os nomes tornam a assinatura mais clara, mas usado em excesso, sobretudo em funções longas, pode esconder de onde vem cada valor.

Uma função variádica aceita um número variável de argumentos do mesmo tipo, marcados com ... antes do tipo.

~~~
func soma(numeros ...int) int {
    total := 0
    for _, n := range numeros {
        total += n
    }
    return total
}

soma(1, 2, 3) // 6
soma()        // 0
~~~

Dentro da função, numeros comporta-se como um []int normal. fmt.Println é a função variádica mais usada em Go, e é por isso que aceita quantos argumentos quiseres.

## Ponteiros

Um ponteiro guarda o endereço de memória de um valor, não o valor em si.

~~~
x := 5
fmt.Println(&x) // endereço de memória de x

p := &x    // p é um ponteiro para x
*p = 10    // altera o valor de x através do ponteiro

fmt.Println(x) // 10
~~~

& aplicado a uma variável devolve o seu endereço. * aplicado a um ponteiro acede, ou altera, o valor guardado nesse endereço, o que se chama dereferenciar. Isto é a base de um dos conceitos mais importantes do resto da trilha, a diferença entre pointer receiver e value receiver nos métodos, que vais ver já no Bloco 1: um método com pointer receiver recebe o endereço do struct original e pode alterá-lo; um método com value receiver recebe uma cópia, e qualquer alteração feita lá dentro desaparece assim que o método termina.

## gofmt: a formatação deixa de ser conversa

Go vem com uma ferramenta de formatação oficial, gofmt, e a comunidade segue-a sem exceção. Não há guerra de tabs contra espaços, nem de chaveta na mesma linha ou na linha seguinte: gofmt decide, e todo o código Go que vês em qualquer projeto sério está formatado da mesma maneira.

~~~
gofmt -l .
gofmt -w .
~~~

gofmt -l . lista, sem alterar nada, os ficheiros cujo formato não segue a convenção. gofmt -w . aplica a formatação diretamente. Na prática, quase ninguém corre estes comandos à mão o dia todo: configuras o editor para formatar ao gravar, e esqueces que a decisão alguma vez foi tua.

A partir daqui, o Bloco 1 introduz structs e methods, as duas construções que substituem o que noutras linguagens seria orientação a objetos com classes e herança. Tudo o que viste aqui, variáveis, tipos, funções e sobretudo ponteiros, volta a aparecer, agora aplicado a tipos que tu próprio defines.`,
    },
    {
      id: "b1",
      titulo: "Bloco 1 — Structs & Methods",
      faixa: "Ex 1–10",
      descricao: "Structs agrupam campos relacionados; methods ligam funções a um tipo via receiver (valor ou ponteiro).",
      recursos: [
        { label: "Tour of Go — Structs", url: "https://go.dev/tour/moretypes/2" },
        { label: "Tour of Go — Methods", url: "https://go.dev/tour/methods/1" },
        { label: "Go by Example — Structs", url: "https://gobyexample.com/structs" },
        { label: "Go by Example — Methods", url: "https://gobyexample.com/methods" },
        { label: "Effective Go — Pointers vs Values", url: "https://go.dev/doc/effective_go#pointers_vs_values" },
      ],
      exercicios: [
        "Cria o struct Task com os campos ID int, Titulo string e Concluida bool.",
        "Implementa o método (t Task) Resumo() string, que devolve \"[✓] Titulo\" quando Concluida é true, ou \"[ ] Titulo\" caso contrário.",
        "Implementa o método (t *Task) Concluir(), com pointer receiver, que muda Concluida para true. Depois escreve a mesma função com value receiver, chama as duas no main e compara o resultado antes e depois de cada chamada.",
        "Cria o struct Produto com os campos Nome string, Preco float64 e Stock int.",
        "Implementa o método (p Produto) EmStock() bool, que devolve true quando Stock é maior que 0.",
        "Implementa o método (p *Produto) Vender(qtd int) error, que reduz o Stock e devolve um erro quando não há stock suficiente.",
        "Cria os structs Retangulo, com os campos Largura e Altura float64, e Circulo, com o campo Raio float64. Dá a cada um o seu próprio método Area().",
        "Cria o struct Endereco com os campos Cidade e Pais string, e usa-o dentro do struct Cliente como um campo aninhado chamado Endereco.",
        "Cria o struct ClienteVIP embutindo Cliente e adicionando o campo Desconto float64. Confirma que consegues aceder a vip.Nome diretamente, sem escreveres vip.Cliente.Nome, porque Go promove os campos do struct embutido.",
        "Implementa o método (t Task) String() string, que satisfaz a interface fmt.Stringer. Depois chama fmt.Println(t1) diretamente e repara que Go usa esse método automaticamente.",
      ],
      dicas: {
        0: `~~~
type Task struct {
    ID        int
    Titulo    string
    Concluida bool
}
~~~

Os campos ficam com maiúscula inicial para serem exportados, ou seja, visíveis fora do pacote onde o struct está definido. Um campo em minúscula só seria visível dentro do próprio pacote.`,

        1: `~~~
func (t Task) Resumo() string {
    if t.Concluida {
        return "[✓] " + t.Titulo
    }
    return "[ ] " + t.Titulo
}
~~~

t é o receiver: liga este método ao tipo Task. Como recebes t por valor, dentro do método tens uma cópia da Task original, o que é suficiente aqui porque só estás a ler os campos, nunca a alterá-los.`,

        2: `~~~
func (t *Task) Concluir() {
    t.Concluida = true
}

func (t Task) ConcluirValor() {
    t.Concluida = true // só altera a cópia local
}

tarefa := Task{Titulo: "Estudar Go"}
tarefa.Concluir()
fmt.Println(tarefa.Concluida) // true

tarefa2 := Task{Titulo: "Ler livro"}
tarefa2.ConcluirValor()
fmt.Println(tarefa2.Concluida) // false, a chamada não teve efeito
~~~

Com pointer receiver, o método recebe o endereço da Task original e altera-a diretamente. Com value receiver, recebe uma cópia, e qualquer alteração feita dentro do método desaparece assim que ele termina. Regra prática: se o método precisa de alterar o struct, usa pointer receiver.`,

        3: `~~~
type Produto struct {
    Nome  string
    Preco float64
    Stock int
}
~~~`,

        4: `~~~
func (p Produto) EmStock() bool {
    return p.Stock > 0
}
~~~`,

        5: `~~~
func (p *Produto) Vender(qtd int) error {
    if qtd > p.Stock {
        return fmt.Errorf("stock insuficiente: pedido %d, disponível %d", qtd, p.Stock)
    }
    p.Stock -= qtd
    return nil
}
~~~

Vender precisa de pointer receiver porque altera p.Stock. fmt.Errorf constrói uma mensagem de erro formatada, tal como Sprintf, mas devolve um valor do tipo error em vez de string.`,

        6: `~~~
type Retangulo struct {
    Largura, Altura float64
}

func (r Retangulo) Area() float64 {
    return r.Largura * r.Altura
}

type Circulo struct {
    Raio float64
}

func (c Circulo) Area() float64 {
    return math.Pi * c.Raio * c.Raio
}
~~~

Podes declarar dois campos do mesmo tipo separados por vírgula, como em Largura, Altura float64. math.Pi vem do pacote math da standard library.`,

        7: `~~~
type Endereco struct {
    Cidade, Pais string
}

type Cliente struct {
    Nome     string
    Endereco Endereco
}

c := Cliente{Nome: "Ana", Endereco: Endereco{Cidade: "Maputo", Pais: "Moçambique"}}
fmt.Println(c.Endereco.Cidade)
~~~

Um struct pode ter outro struct como tipo de um dos seus campos. Para lá chegares, encadeias os nomes dos campos: c.Endereco.Cidade.`,

        8: `~~~
type ClienteVIP struct {
    Cliente
    Desconto float64
}

vip := ClienteVIP{Cliente: Cliente{Nome: "Ana"}, Desconto: 0.1}
fmt.Println(vip.Nome) // funciona, mesmo sem escrever vip.Cliente.Nome
~~~

Quando embutes Cliente sem lhe dares um nome de campo, os seus campos ficam promovidos: acedes a vip.Nome diretamente, como se pertencesse ao próprio ClienteVIP. É diferente do exercício anterior, onde Endereco tinha um nome de campo próprio e por isso precisavas do caminho completo.`,

        9: `~~~
func (t Task) String() string {
    return t.Resumo()
}

t1 := Task{Titulo: "Estudar Go", Concluida: true}
fmt.Println(t1) // chama String() automaticamente, imprime "[✓] Estudar Go"
~~~

fmt.Stringer é uma interface com um único método, String() string. Qualquer tipo que a implemente passa a controlar a sua própria representação em texto, e o pacote fmt usa-a sempre que tenta imprimir um valor desse tipo.`,
      },
      livro: `Go não tem classes. Structs agrupam dados, methods ligam comportamento a esses dados, e a composição substitui a herança. Este capítulo é a base de quase tudo o que se segue na trilha: a escolha entre pointer receiver e value receiver, sobretudo, vai voltar a aparecer em praticamente todos os blocos daqui para a frente.

## Structs: dados sem comportamento próprio

Uma struct é um tipo composto, um agrupamento de campos com nome e tipo próprios.

~~~
type Task struct {
    ID        int
    Titulo    string
    Concluida bool
}

t := Task{ID: 1, Titulo: "Estudar Go", Concluida: false}
~~~

Por si só, uma struct não faz nada: é só dados. O que a torna útil é poderes anexar-lhe comportamento através de methods, e poderes agrupá-la em slices e maps, como vais fazer já no Bloco 2.

Um campo com maiúscula inicial, como ID ou Titulo, é exportado: fica visível fora do pacote onde a struct está definida. Um campo em minúscula só é visível dentro do próprio pacote. Esta é a única forma de controlar visibilidade em Go: não há palavras-chave como public ou private, é tudo decidido pela primeira letra do nome.

## Methods: a função que pertence a um tipo

Um method é uma função normal, com uma particularidade: declara-se com um recetor entre func e o nome do method, o que a liga a um tipo específico.

~~~
func (t Task) Resumo() string {
    if t.Concluida {
        return "[✓] " + t.Titulo
    }
    return "[ ] " + t.Titulo
}

t.Resumo() // chamas o method como se fosse um campo
~~~

t Task é o recetor. Dentro do method, t comporta-se como qualquer outro parâmetro: podes ler os seus campos, mas se o recebes por valor, como aqui, qualquer alteração que faças a t desaparece assim que o method termina, porque estás a trabalhar sobre uma cópia.

## A escolha entre pointer receiver e value receiver

Esta é a decisão mais importante deste bloco, e a que mais se repete no resto da trilha.

~~~
func (t *Task) Concluir() {
    t.Concluida = true
}

func (t Task) ConcluirValor() {
    t.Concluida = true // só altera a cópia local, o efeito perde-se
}
~~~

Com pointer receiver, *Task, o method recebe o endereço da struct original, e qualquer alteração que faça é permanente. Com value receiver, Task, recebe uma cópia, e as alterações desaparecem quando o method termina. A regra prática: se o method precisa de alterar o struct, usa pointer receiver. Se só precisa de ler, e a struct é pequena, value receiver é mais simples e evita uma indireção desnecessária.

Há uma segunda razão para pointer receiver, que só se torna relevante com structs maiores: copiar uma struct grande, valor a valor, custa mais do que copiar um ponteiro de 8 bytes. Na prática, muitos projetos Go escolhem pointer receiver para quase todos os methods de um tipo, só para manterem a consistência, mesmo quando um method em particular não precisa de alterar nada.

## Structs aninhados e embedding

Um campo de uma struct pode ser, ele próprio, outra struct.

~~~
type Endereco struct {
    Cidade, Pais string
}

type Cliente struct {
    Nome     string
    Endereco Endereco // campo nomeado
}

c.Endereco.Cidade // precisas do caminho completo
~~~

Quando o campo tem nome próprio, como Endereco aqui, acedes-lhe através desse nome. Mas Go tem uma segunda forma de compor structs, chamada embedding, em que omites o nome do campo:

~~~
type ClienteVIP struct {
    Cliente // embutido, sem nome de campo
    Desconto float64
}

vip.Nome // funciona diretamente, sem vip.Cliente.Nome
~~~

Quando embutes um tipo sem lhe dares nome, os seus campos ficam promovidos: passam a ser acessíveis diretamente a partir do tipo que o embute, como se lhe pertencessem. Isto é o mais próximo que Go chega de herança, mas é composição, não herança a sério: ClienteVIP não é um Cliente aos olhos do sistema de tipos, só tem os seus campos acessíveis por conveniência de escrita.

## Como Go decide o que imprimir: fmt.Stringer

fmt.Stringer é uma interface com um único method, String() string. Qualquer tipo que a implemente controla a sua própria representação em texto.

~~~
func (t Task) String() string {
    return t.Resumo()
}

fmt.Println(t1) // chama String() automaticamente
~~~

Não precisas de dizer explicitamente que Task implementa fmt.Stringer: basta ter um method String() string com esta assinatura exata, e o pacote fmt passa a usá-lo sempre que tenta imprimir um valor desse tipo. Isto é a tua primeira introdução a interfaces em Go, que só vais formalizar no Bloco 4, mas que já está a acontecer por baixo desde o primeiro fmt.Println que escreveste.

No Bloco 2 vais colocar muitas Tasks dentro de um slice, e usar o Resumo() e o Concluir() que aqui construíste sobre coleções inteiras, não valores isolados.`,
    },
    {
      id: "b2",
      titulo: "Bloco 2 — Slices, Arrays & Maps",
      faixa: "Ex 11–25",
      descricao: "Slices são a estrutura de dados mais usada em Go; arrays têm tamanho fixo; maps são pares chave-valor.",
      recursos: [
        { label: "Tour of Go — Slices", url: "https://go.dev/tour/moretypes/7" },
        { label: "Tour of Go — Maps", url: "https://go.dev/tour/moretypes/19" },
        { label: "Go by Example — Slices", url: "https://gobyexample.com/slices" },
        { label: "Go by Example — Arrays", url: "https://gobyexample.com/arrays" },
        { label: "Go by Example — Maps", url: "https://gobyexample.com/maps" },
        { label: "Go Slices: usage and internals", url: "https://go.dev/blog/slices-intro" },
      ],
      exercicios: [
        "Cria um slice []Task com 4 tarefas e imprime o Resumo() de cada uma usando range.",
        "Implementa TarefasPendentes(tarefas []Task) []Task, que filtra as tarefas com Concluida igual a false, construindo o resultado com append.",
        "Implementa TarefasConcluidas(tarefas []Task) []Task, que faz o inverso da função anterior.",
        "Implementa ContarConcluidas(tarefas []Task) int, que conta as tarefas concluídas sem criar um novo slice.",
        "Implementa TituloMaisLongo(tarefas []Task) string, que percorre o slice e guarda o título mais longo encontrado.",
        "Ordena um []Task por Titulo usando sort.Slice.",
        "Ordena o mesmo slice por Concluida, deixando as tarefas pendentes primeiro.",
        "Cria um map[int]Task a partir do slice de tarefas, usando o campo ID como chave.",
        "Implementa BuscarPorID(id int, m map[int]Task) (Task, bool), seguindo o padrão idiomático de devolver o valor e um booleano ok.",
        "Implementa RemoverPorID(id int, m map[int]Task), que remove a entrada correspondente usando delete().",
        "Escreve um exemplo lado a lado que mostra a diferença entre um array [5]int, de tamanho fixo, e um slice []int, de tamanho dinâmico.",
        "Cria um map[string]int que conta a frequência de cada palavra numa frase, usando strings.Fields combinado com um loop.",
        "Cria uma matriz 3x3 como slice de slices ([][]int) e imprime-a de forma formatada.",
        "Implementa Copiar(tarefas []Task) []Task usando copy(), e prova que alterar a cópia não afeta o slice original.",
        "Implementa Achatar(matriz [][]int) []int, que junta uma matriz num único slice plano.",
      ],
      dicas: {
        0: `~~~
tarefas := []Task{
    {ID: 1, Titulo: "Estudar Go"},
    {ID: 2, Titulo: "Fazer exercício"},
    {ID: 3, Titulo: "Ler um livro"},
    {ID: 4, Titulo: "Descansar"},
}

for _, t := range tarefas {
    fmt.Println(t.Resumo())
}
~~~

range devolve dois valores em cada volta: o índice e uma cópia do elemento. Usa _ para ignorares o índice quando não precisares dele.`,

        1: `~~~
func TarefasPendentes(tarefas []Task) []Task {
    var pendentes []Task
    for _, t := range tarefas {
        if !t.Concluida {
            pendentes = append(pendentes, t)
        }
    }
    return pendentes
}
~~~

var pendentes []Task cria um slice vazio. append acrescenta um elemento e devolve o slice atualizado, por isso é preciso voltar a atribuí-lo: pendentes = append(pendentes, t).`,

        2: `~~~
func TarefasConcluidas(tarefas []Task) []Task {
    var concluidas []Task
    for _, t := range tarefas {
        if t.Concluida {
            concluidas = append(concluidas, t)
        }
    }
    return concluidas
}
~~~

O mesmo padrão do exercício anterior, só a trocar a condição.`,

        3: `~~~
func ContarConcluidas(tarefas []Task) int {
    total := 0
    for _, t := range tarefas {
        if t.Concluida {
            total++
        }
    }
    return total
}
~~~

Não precisas de guardar as tarefas nem de saber quais são, só de as contar. Por isso não há slice novo, só um inteiro que vai somando.`,

        4: `~~~
func TituloMaisLongo(tarefas []Task) string {
    maior := ""
    for _, t := range tarefas {
        if len(t.Titulo) > len(maior) {
            maior = t.Titulo
        }
    }
    return maior
}
~~~

len() devolve o número de bytes de uma string. Para texto só com carateres ASCII, isso coincide com o número de carateres.`,

        5: `~~~
sort.Slice(tarefas, func(i, j int) bool {
    return tarefas[i].Titulo < tarefas[j].Titulo
})
~~~

sort.Slice recebe o slice e uma função que compara dois elementos pelos seus índices. Devolve true quando o elemento i deve ficar antes do elemento j.`,

        6: `~~~
sort.Slice(tarefas, func(i, j int) bool {
    return !tarefas[i].Concluida && tarefas[j].Concluida
})
~~~

A função de comparação devolve true quando i, pendente, deve vir antes de j, concluída. Isto ordena as pendentes primeiro.`,

        7: `~~~
porID := make(map[int]Task)
for _, t := range tarefas {
    porID[t.ID] = t
}
~~~

make(map[int]Task) cria um map vazio, pronto a receber entradas. Sem o make, um map declarado com var fica nil e não podes escrever nele, apenas ler.`,

        8: `~~~
func BuscarPorID(id int, m map[int]Task) (Task, bool) {
    t, ok := m[id]
    return t, ok
}
~~~

Ler um map devolve dois valores: o valor guardado, ou o valor zero se a chave não existir, e um booleano que confirma se a chave existia. É o padrão idiomático para procuras que podem falhar sem ser propriamente um erro.`,

        9: `~~~
func RemoverPorID(id int, m map[int]Task) {
    delete(m, id)
}
~~~

delete() não faz nada, sem gerar erro, se a chave não existir. Como os maps são passados por referência, alterar m dentro da função altera o map original.`,

        10: `~~~
var arr [5]int         // array: tamanho 5, fixo para sempre
arr[0] = 10

var s []int             // slice: tamanho dinâmico
s = append(s, 10, 20)

fmt.Println(len(arr), len(s)) // 5 2
~~~

O tamanho de um array faz parte do seu tipo: [5]int e [3]int são tipos diferentes, e o tamanho nunca muda. Um slice cresce com append, e é o que usas quase sempre em Go.`,

        11: `~~~
frase := "o rato roeu a roupa do rei de roma"
palavras := strings.Fields(frase)

frequencia := make(map[string]int)
for _, p := range palavras {
    frequencia[p]++
}
~~~

strings.Fields separa a frase em palavras a partir dos espaços em branco. frequencia[p]++ funciona mesmo na primeira vez que vês uma palavra, porque ler uma chave que não existe devolve o valor zero do tipo, que para int é 0.`,

        12: `~~~
matriz := [][]int{
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9},
}

for _, linha := range matriz {
    fmt.Println(linha)
}
~~~

[][]int é um slice onde cada elemento é, ele próprio, um []int. Não há nada de mágico: é só um slice a guardar slices.`,

        13: `~~~
func Copiar(tarefas []Task) []Task {
    copia := make([]Task, len(tarefas))
    copy(copia, tarefas)
    return copia
}

original := []Task{{Titulo: "A"}}
copia := Copiar(original)
copia[0].Titulo = "B"
fmt.Println(original[0].Titulo) // continua "A"
~~~

copy() precisa de um slice de destino já com o tamanho certo, por isso primeiro crias copia com make. Sem isto, se apenas fizesses copia := tarefas, as duas variáveis apontariam para o mesmo array por baixo, e alterar uma alterava a outra.`,

        14: `~~~
func Achatar(matriz [][]int) []int {
    var plano []int
    for _, linha := range matriz {
        plano = append(plano, linha...)
    }
    return plano
}
~~~

linha... espalha os elementos do slice linha como argumentos individuais de append, em vez de os acrescentares como um único elemento slice-dentro-de-slice.`,
      },
      livro: `Slices são a estrutura de dados que mais vais usar em Go, de longe. Este capítulo explica o que são por dentro, porque isso importa, e como se relacionam com arrays e maps, as outras duas formas de agrupar dados que a linguagem oferece.

## Arrays: tamanho fixo, por isso raramente usados diretamente

Um array em Go tem um tamanho que faz parte do seu próprio tipo.

~~~
var arr [5]int // [5]int e [3]int são tipos diferentes, sem conversão implícita
arr[0] = 10
~~~

Como o tamanho nunca muda, e está gravado no tipo, arrays são pouco flexíveis: uma função que recebe [5]int não aceita um [3]int. Na prática, usa-se muito pouco um array diretamente em código Go; o que se usa é um slice.

## Slices: como funcionam por dentro

Um slice não é uma estrutura de dados nova, é uma vista sobre um array: um ponteiro para o início dos dados, um comprimento, e uma capacidade.

~~~
var s []int              // slice nil, sem array por baixo ainda
s = append(s, 10, 20)    // agora tem um array por baixo, len 2
~~~

Isto explica um comportamento que confunde quem vem de outras linguagens: dois slices podem partilhar o mesmo array por baixo. Se fatiares um slice a partir de outro, sem copy(), alterar um pode alterar o outro, porque ambos apontam para a mesma memória. É também por isto que copy() existe: para garantires que uma cópia é mesmo independente.

## append e o crescimento de um slice

append acrescenta elementos a um slice, e devolve o slice atualizado, que pode ou não ser o mesmo array de antes.

~~~
pendentes := []Task{}
for _, t := range tarefas {
    if !t.Concluida {
        pendentes = append(pendentes, t)
    }
}
~~~

Enquanto a capacidade do array por baixo chega, append só escreve na próxima posição livre. Quando a capacidade se esgota, Go aloca um array novo, maior, copia os elementos antigos, e o slice devolvido passa a apontar para esse array novo. É por isto que se escreve sempre pendentes = append(pendentes, t), e nunca só append(pendentes, t): o slice original pode já não ser válido depois da chamada.

## Maps: o padrão (valor, ok)

Um map guarda pares chave-valor, e ler uma chave que não existe não gera erro, devolve o valor zero do tipo.

~~~
porID := make(map[int]Task)
porID[t.ID] = t

t, ok := porID[99]
// ok é false se a chave não existir; t fica com o valor zero de Task
~~~

Este padrão, (valor, ok), aparece por toda a parte em Go: é a forma idiomática de uma operação que pode falhar sem que essa falha seja um erro a sério, e vais voltar a vê-lo com type assertions no Bloco 4.

## Ordenar com sort.Slice

sort.Slice ordena um slice in-place, a partir de uma função que compara dois elementos pelos seus índices.

~~~
sort.Slice(tarefas, func(i, j int) bool {
    return tarefas[i].Titulo < tarefas[j].Titulo
})
~~~

A função devolve true quando o elemento i deve ficar antes do j. Podes usar qualquer critério de comparação que consigas exprimir como um bool, incluindo critérios compostos, como pendentes primeiro e depois por título.

## Cópias, referências, e o que copy() resolve

~~~
copia := make([]Task, len(original))
copy(copia, original)
copia[0].Titulo = "Alterado" // não afeta original
~~~

Sem o make() e o copy(), se escrevesses copia := original, as duas variáveis apontariam para o mesmo array por baixo, e alterar uma alteraria a outra. copy() precisa de um destino já com o tamanho certo, e copia só os elementos que couberem em ambos.

No Bloco 3, as mesmas funções que aqui construíste, como BuscarPorID, vão começar a devolver erros em vez de um booleano simples, à medida que o que pode correr mal deixa de ser só "não encontrado".`,
    },
    {
      id: "b3",
      titulo: "Bloco 3 — Error Handling idiomático",
      faixa: "Ex 26–35",
      descricao: "Go não tem exceptions: erros são valores normais, devolvidos como último retorno e verificados com if err != nil.",
      recursos: [
        { label: "Tour of Go — Errors", url: "https://go.dev/tour/methods/19" },
        { label: "Go by Example — Errors", url: "https://gobyexample.com/errors" },
        { label: "Go by Example — Custom Errors", url: "https://gobyexample.com/custom-errors" },
        { label: "Working with Errors in Go 1.13", url: "https://go.dev/blog/go1.13-errors" },
      ],
      exercicios: [
        "Implementa Dividir(a, b float64) (float64, error), que devolve um erro criado com errors.New quando b é igual a 0.",
        "Reescreve o método Vender() do Produto para usar errors.New em vez de devolver uma string simples.",
        "Cria o erro customizado ErroStockInsuficiente, com os campos Pedido e Disponivel int, que implementa o método Error() string.",
        "Faz Vender() devolver ErroStockInsuficiente quando for o caso, e usa errors.As no main para identificar esse tipo de erro.",
        "Faz BuscarPorID devolver (Task, error) em vez de (Task, bool), e reflete sobre quando cada abordagem faz mais sentido.",
        "Escreve uma função que executa 3 operações em sequência, em que qualquer uma pode falhar, usando o padrão early return: if err != nil { return err } depois de cada passo.",
        "Usa fmt.Errorf(\"contexto: %w\", err) para adicionares contexto a um erro sem perderes o erro original.",
        "Cria o sentinel error var ErrNaoEncontrado = errors.New(\"não encontrado\"), usa-o em BuscarPorID e verifica-o com errors.Is.",
        "Implementa ValidarTask(t Task) error, que devolve um erro descritivo quando o campo Titulo está vazio.",
        "Usa defer e recover numa função que causa um panic de propósito, e recupera dele sem que o programa termine abruptamente.",
      ],
      dicas: {
        0: `~~~
func Dividir(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("divisão por zero")
    }
    return a / b, nil
}
~~~

Por convenção, quando uma função devolve um erro, o erro é sempre o último valor de retorno. Quando não há erro, devolve-se nil.`,

        1: `~~~
func (p *Produto) Vender(qtd int) error {
    if qtd > p.Stock {
        return errors.New("stock insuficiente")
    }
    p.Stock -= qtd
    return nil
}
~~~

O mesmo Vender do Bloco 1, agora a devolver um error a sério em vez de uma string.`,

        2: `~~~
type ErroStockInsuficiente struct {
    Pedido, Disponivel int
}

func (e ErroStockInsuficiente) Error() string {
    return fmt.Sprintf("pedido de %d, mas só há %d em stock", e.Pedido, e.Disponivel)
}
~~~

Qualquer tipo que implemente o método Error() string satisfaz a interface error. Guardar Pedido e Disponivel no próprio erro permite a quem o recebe inspecionar esses valores, e não só ler uma mensagem de texto.`,

        3: `~~~
func (p *Produto) Vender(qtd int) error {
    if qtd > p.Stock {
        return ErroStockInsuficiente{Pedido: qtd, Disponivel: p.Stock}
    }
    p.Stock -= qtd
    return nil
}

err := produto.Vender(10)
var errStock ErroStockInsuficiente
if errors.As(err, &errStock) {
    fmt.Println("faltam", errStock.Pedido-errStock.Disponivel)
}
~~~

errors.As verifica se err é, ou contém, um valor do tipo de errStock, e se for, copia-o para essa variável. É a forma idiomática de recuperares um erro customizado a partir de um error genérico.`,

        4: `~~~
func BuscarPorID(id int, m map[int]Task) (Task, error) {
    t, ok := m[id]
    if !ok {
        return Task{}, fmt.Errorf("tarefa %d não encontrada", id)
    }
    return t, nil
}
~~~

A versão com bool é suficiente quando quem chama só precisa de saber se encontrou ou não. A versão com error compensa quando queres distinguir motivos de falha diferentes, ou propagar contexto sobre o que correu mal.`,

        5: `~~~
func processar() error {
    if err := passo1(); err != nil {
        return err
    }
    if err := passo2(); err != nil {
        return err
    }
    if err := passo3(); err != nil {
        return err
    }
    return nil
}
~~~

Cada passo é verificado logo a seguir a correr, e a função sai imediatamente se algum falhar. É o padrão mais comum em Go para encadear operações que podem falhar, em vez de aninhar ifs uns dentro dos outros.`,

        6: `~~~
func abrirFicheiro() error {
    _, err := os.Open("dados.txt")
    if err != nil {
        return fmt.Errorf("ao abrir dados.txt: %w", err)
    }
    return nil
}
~~~

%w embrulha o erro original dentro do novo, em vez de o converter só em texto com %v. Isso permite que errors.Is e errors.As continuem a encontrar o erro original mais tarde, mesmo depois de várias camadas de contexto acrescentado.`,

        7: `~~~
var ErrNaoEncontrado = errors.New("não encontrado")

func BuscarPorID(id int, m map[int]Task) (Task, error) {
    t, ok := m[id]
    if !ok {
        return Task{}, ErrNaoEncontrado
    }
    return t, nil
}

_, err := BuscarPorID(99, m)
if errors.Is(err, ErrNaoEncontrado) {
    fmt.Println("não existe")
}
~~~

Um sentinel error é um valor de erro específico, definido uma vez, que se compara com errors.Is. Diferente de ErroStockInsuficiente, aqui não há dados extra a guardar, só a identidade do erro.`,

        8: `~~~
func ValidarTask(t Task) error {
    if t.Titulo == "" {
        return errors.New("o título não pode estar vazio")
    }
    return nil
}
~~~`,

        9: `~~~
func seguro() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recuperado de:", r)
        }
    }()
    panic("algo correu muito mal")
}

seguro()
fmt.Println("o programa continua") // esta linha corre na mesma
~~~

defer agenda a função anónima para correr quando seguro() terminar, mesmo que termine por panic. recover() só tem efeito dentro de uma função chamada diretamente por defer, e devolve nil quando não há panic em curso.`,
      },
      livro: `Go não tem exceções. Não há try/catch, nem throw: um erro é um valor normal, do tipo error, devolvido como o último resultado de uma função, e verificado explicitamente logo a seguir a cada chamada. Este capítulo explica porque essa escolha de desenho existe, e como trabalhar com ela sem que o código fique cheio de ifs repetidos.

## O erro como valor de retorno

~~~
func Dividir(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("divisão por zero")
    }
    return a / b, nil
}

resultado, err := Dividir(10, 0)
if err != nil {
    // trata o erro aqui, explicitamente
}
~~~

Por convenção, o erro é sempre o último valor devolvido, e devolve-se nil quando não há erro. Isto obriga quem chama a decidir, ali mesmo, o que fazer com uma falha, em vez de deixar uma exceção subir silenciosamente por várias camadas de chamadas até alguém a apanhar, ou não apanhar. A desvantagem é visível: muito if err != nil repetido. A vantagem é que nunca há uma falha escondida: se uma função pode falhar, isso está na sua assinatura, visível a quem a lê.

## Erros customizados: quando um struct compensa mais que uma string

errors.New cria um erro simples, só com uma mensagem de texto. Quando quem recebe o erro precisa de mais do que ler uma frase, um erro customizado guarda dados estruturados.

~~~
type ErroStockInsuficiente struct {
    Pedido, Disponivel int
}

func (e ErroStockInsuficiente) Error() string {
    return fmt.Sprintf("pedido de %d, mas só há %d em stock", e.Pedido, e.Disponivel)
}
~~~

Qualquer tipo com um method Error() string satisfaz a interface error, a mesma ideia de satisfação implícita que já viste com fmt.Stringer no Bloco 1. Isto significa que um erro em Go pode ser, ao mesmo tempo, uma mensagem de texto e uma estrutura de dados que o código pode inspecionar.

## Recuperar um erro customizado com errors.As

~~~
err := produto.Vender(10)

var errStock ErroStockInsuficiente
if errors.As(err, &errStock) {
    fmt.Println("faltam", errStock.Pedido-errStock.Disponivel)
}
~~~

errors.As verifica se err é, ou contém, um valor do tipo de errStock, e se for, copia-o para essa variável, dando-te acesso aos campos Pedido e Disponivel, não só à mensagem.

## Contexto com %w e a cadeia de erros

À medida que um erro sobe por várias camadas de uma aplicação, cada camada pode querer acrescentar contexto sem esconder o erro original.

~~~
if err != nil {
    return fmt.Errorf("ao processar pedido %d: %w", id, err)
}
~~~

%w embrulha o erro original dentro do novo. A diferença para %v, que só o converteria em texto, é que errors.Is e errors.As continuam a conseguir encontrar o erro original mesmo depois de várias camadas de fmt.Errorf com %w, uma sobre a outra. É esta cadeia que te permite escrever mensagens de erro informativas em cada camada, sem perderes a capacidade de verificar programaticamente o que correu mal lá no fundo.

## Sentinel errors e errors.Is

Um sentinel error é um valor de erro específico, definido uma vez, para identidade, não para dados.

~~~
var ErrNaoEncontrado = errors.New("não encontrado")

if errors.Is(err, ErrNaoEncontrado) {
    // trata especificamente este caso
}
~~~

Ao contrário de ErroStockInsuficiente, aqui não há campos a inspecionar, só a pergunta "é este erro, ou embrulha este erro?", que é exatamente o que errors.Is responde.

## defer, panic e recover: a válvula de escape

panic interrompe a execução normal de um programa de forma abrupta, e é reservado para situações genuinamente excecionais, um índice de array fora dos limites, um ponteiro nil desreferenciado, não para erros esperados do dia a dia, que continuam a usar o padrão de retorno com error.

~~~
defer func() {
    if r := recover(); r != nil {
        fmt.Println("recuperado de:", r)
    }
}()
panic("algo correu muito mal")
~~~

defer agenda uma função para correr quando a função atual terminar, mesmo que termine por panic. recover() só tem efeito dentro de uma função chamada diretamente por defer, e permite a um programa continuar depois de um panic, em vez de terminar por completo. Na prática, isto usa-se sobretudo em servidores, para uma goroutine com um bug não derrubar o processo inteiro, e raramente para controlo de fluxo normal.

No Bloco 4, vais ver a interface error como o que sempre foi, um caso particular de uma interface qualquer, e vais construir as tuas próprias.`,
    },
    {
      id: "b4",
      titulo: "Bloco 4 — Interfaces",
      faixa: "Ex 36–45",
      descricao: "Interfaces definem comportamento, não estrutura. Qualquer tipo que implemente os métodos satisfaz a interface automaticamente.",
      recursos: [
        { label: "Tour of Go — Interfaces", url: "https://go.dev/tour/methods/9" },
        { label: "Go by Example — Interfaces", url: "https://gobyexample.com/interfaces" },
        { label: "Effective Go — Interfaces", url: "https://go.dev/doc/effective_go#interfaces" },
      ],
      exercicios: [
        "Cria a interface Concluivel com o método Concluir(), e confirma que *Task já a satisfaz sem precisares de declarar nada extra.",
        "Implementa ConcluirTudo(itens []Concluivel), uma função que recebe qualquer valor que seja \"concluível\".",
        "Cria um segundo tipo, Habito, que também implementa Concluir(), e passa uma lista mista []Concluivel com Tasks e Habitos.",
        "Cria a interface Formatavel com o método Resumo() string, e implementa ImprimirTodos(itens []Formatavel).",
        "Usa a interface vazia any na função Descrever(v any), que imprime o tipo e o valor recebidos com fmt.Printf(\"%T: %v\", v, v).",
        "Dentro de Descrever, usa uma type assertion no formato if t, ok := v.(Task); ok { ... } para identificar quando o valor é uma Task.",
        "Substitui a assertion anterior por um type switch: switch x := v.(type) { case Task: ...; case Produto: ...; default: ... }.",
        "Desenha, só a estrutura por agora, a interface Repositorio com os métodos Adicionar(Task) e BuscarPorID(int) (Task, error).",
        "Implementa a interface sort.Interface, com os métodos Len(), Less() e Swap(), num []Task customizado, e ordena-o com sort.Sort().",
        "Escreve num comentário as tuas conclusões sobre quando compensa criar uma interface em vez de usar a struct diretamente.",
      ],
      dicas: {
        0: `~~~
type Concluivel interface {
    Concluir()
}
~~~

Não precisas de escrever nada como "Task implements Concluivel". Basta que *Task tenha um método Concluir() com esta assinatura exata, e o compilador considera automaticamente que satisfaz a interface.`,

        1: `~~~
func ConcluirTudo(itens []Concluivel) {
    for _, item := range itens {
        item.Concluir()
    }
}
~~~

O parâmetro é do tipo da interface, não de um tipo concreto. ConcluirTudo aceita qualquer slice de valores que tenham um método Concluir(), sem saber, nem precisar de saber, que tipos concretos são esses.`,

        2: `~~~
type Habito struct {
    Nome  string
    Feito bool
}

func (h *Habito) Concluir() {
    h.Feito = true
}

itens := []Concluivel{&Task{Titulo: "A"}, &Habito{Nome: "B"}}
ConcluirTudo(itens)
~~~

Repara que uso &Task e &Habito: como Concluir() tem pointer receiver nos dois tipos, só os ponteiros satisfazem a interface, não os valores diretamente.`,

        3: `~~~
type Formatavel interface {
    Resumo() string
}

func ImprimirTodos(itens []Formatavel) {
    for _, item := range itens {
        fmt.Println(item.Resumo())
    }
}
~~~`,

        4: `~~~
func Descrever(v any) {
    fmt.Printf("%T: %v\n", v, v)
}

Descrever(42)          // int: 42
Descrever("texto")     // string: texto
Descrever(Task{})      // main.Task: {0  false}
~~~

any é um pseudónimo do tipo interface{}, a interface vazia: como não exige método nenhum, qualquer valor a satisfaz. É útil quando uma função genuinamente precisa de aceitar qualquer coisa, mas usa-a com moderação, porque perdes a verificação de tipos em tempo de compilação.`,

        5: `~~~
func Descrever(v any) {
    if t, ok := v.(Task); ok {
        fmt.Println("é uma Task:", t.Titulo)
        return
    }
    fmt.Printf("%T: %v\n", v, v)
}
~~~

v.(Task) tenta converter v para o tipo Task. Na forma com dois valores, ok vem false em vez de gerar panic quando a conversão falha, tal como acontece a ler um map.`,

        6: `~~~
func Descrever(v any) {
    switch x := v.(type) {
    case Task:
        fmt.Println("é uma Task:", x.Titulo)
    case Produto:
        fmt.Println("é um Produto:", x.Nome)
    default:
        fmt.Printf("tipo desconhecido: %T\n", x)
    }
}
~~~

Dentro de cada case, x já vem automaticamente com o tipo concreto desse case: no case Task, x é do tipo Task, não any. Isto substitui uma sequência de type assertions por algo mais direto de ler.`,

        7: `~~~
type Repositorio interface {
    Adicionar(Task)
    BuscarPorID(int) (Task, error)
}
~~~

Por agora é só a assinatura, sem implementação nenhuma. Vais construir uma implementação real a sério no Bloco 10.`,

        8: `~~~
type PorTitulo []Task

func (p PorTitulo) Len() int           { return len(p) }
func (p PorTitulo) Less(i, j int) bool { return p[i].Titulo < p[j].Titulo }
func (p PorTitulo) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }

sort.Sort(PorTitulo(tarefas))
~~~

sort.Interface exige três métodos: Len, Less e Swap. Defini-los sobre um tipo novo, PorTitulo, que é só um []Task com nome próprio, é o padrão idiomático anterior à chegada de sort.Slice, que faz a mesma coisa sem precisares de declarar um tipo.`,

        9: `Não há código certo ou errado aqui, é uma reflexão. Um fio condutor útil: cria uma interface quando precisas de tratar tipos diferentes da mesma forma, ou quando queres trocar a implementação sem tocar em quem a usa, como fizeste com o Repositorio em memória. Se só existe um tipo concreto e não prevês outro, a interface costuma ser peso a mais.`,
      },
      livro: `Interfaces em Go definem comportamento, não estrutura: uma lista de methods que um tipo tem de ter, sem nenhuma palavra-chave a ligar explicitamente um tipo a uma interface. Qualquer tipo que tenha os methods certos satisfaz a interface, automaticamente, mesmo que quem o escreveu nunca tenha ouvido falar dela. Este capítulo é sobre o que isso muda na forma como desenhas código.

## Satisfação implícita

~~~
type Concluivel interface {
    Concluir()
}
~~~

Não escreves "Task implements Concluivel" em lado nenhum. Basta que *Task tenha um method Concluir() com esta assinatura exata, e o compilador considera, sozinho, que *Task satisfaz Concluivel. Isto tem uma consequência importante: podes definir uma interface pequena depois de já teres o tipo concreto escrito, sem alterar esse tipo, e sem que ele sequer saiba que a interface existe.

~~~
func ConcluirTudo(itens []Concluivel) {
    for _, item := range itens {
        item.Concluir()
    }
}
~~~

ConcluirTudo aceita qualquer coisa que saiba Concluir(), sem saber, nem precisar de saber, que tipos concretos são esses. Podes passar-lhe Tasks, Habitos, ou qualquer tipo futuro que ainda nem exista, desde que tenha o method certo.

## Interfaces pequenas: o princípio idiomático

Em Go, é comum interfaces terem um, dois, no máximo três methods. error, com um único method, e fmt.Stringer, também com um único method, são os exemplos canónicos da standard library. A ideia por trás disto: quanto mais pequena a interface, mais fácil é qualquer tipo satisfazê-la, e mais reutilizável se torna o código que a aceita como parâmetro. Uma interface com dez methods só é satisfeita por tipos que implementem os dez, o que estreita drasticamente quem a pode usar.

## A interface vazia e os seus limites

~~~
func Descrever(v any) {
    fmt.Printf("%T: %v\n", v, v)
}
~~~

any, um pseudónimo de interface{}, não exige nenhum method, por isso qualquer valor a satisfaz. É útil quando uma função genuinamente precisa de aceitar qualquer coisa, como fmt.Println aceita, mas o preço é perderes a verificação de tipos em tempo de compilação: o compilador já não te avisa se passares o tipo errado, porque, do ponto de vista dele, todos os tipos estão certos.

## Type assertions e type switches

Quando tens um valor do tipo any, ou de uma interface, e precisas de saber o tipo concreto por baixo, usas uma type assertion ou um type switch.

~~~
if t, ok := v.(Task); ok {
    fmt.Println("é uma Task:", t.Titulo)
}

switch x := v.(type) {
case Task:
    fmt.Println("Task:", x.Titulo)
case Produto:
    fmt.Println("Produto:", x.Nome)
default:
    fmt.Printf("desconhecido: %T\n", x)
}
~~~

A assertion com dois valores segue o mesmo padrão (valor, ok) que já viste com maps no Bloco 2: ok vem false, em vez de panic, quando a conversão falha. O type switch é a forma idiomática de tratares vários tipos possíveis de uma vez, e dentro de cada case, a variável já vem com o tipo concreto desse case, não com any.

## sort.Interface: interfaces como contrato entre a tua struct e a standard library

~~~
type PorTitulo []Task

func (p PorTitulo) Len() int           { return len(p) }
func (p PorTitulo) Less(i, j int) bool { return p[i].Titulo < p[j].Titulo }
func (p PorTitulo) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }

sort.Sort(PorTitulo(tarefas))
~~~

sort.Interface é uma interface com três methods, e implementá-la sobre um tipo teu, PorTitulo, que é só um []Task com nome próprio, é como o pacote sort da standard library conseguia ordenar tipos que nem sabia que existiam, antes de sort.Slice simplificar isto. É um bom exemplo de como uma interface pequena e bem desenhada permite que código escrito por terceiros, anos antes de o teu tipo existir, funcione sobre ele sem alterações.

## Quando compensa criar uma interface

Cria uma interface quando precisas de tratar tipos diferentes da mesma forma, como fizeste com Concluivel, ou quando queres trocar a implementação sem tocar em quem a usa, o que vais fazer a sério com o Repositorio no Bloco 10. Se só existe um tipo concreto, e não prevês um segundo, a interface costuma ser peso a mais: mais uma camada de abstração para ler, sem benefício real ainda.

A partir do Bloco 5, o projeto cresce para várias pastas, e as interfaces que aqui desenhaste começam a viver num pacote, e as suas implementações noutro.`,
    },
    {
      id: "b5",
      titulo: "Bloco 5 — Organização em pacotes",
      faixa: "Ex 46–50",
      descricao: "À medida que um projeto cresce, um único ficheiro deixa de chegar. Este bloco ensina a estrutura de pastas padrão usada pela comunidade Go.",
      recursos: [
        { label: "How to Write Go Code", url: "https://go.dev/doc/code" },
        { label: "Standard Go Project Layout", url: "https://github.com/golang-standards/project-layout" },
      ],
      exercicios: [
        "Divide um projeto que estava num único main.go em dois ficheiros, main.go e task.go, mantendo ambos no mesmo pacote main.",
        "Cria um pacote separado numa pasta models/, com o ficheiro task.go dentro dela declarado como package models, e importa-o em main.go.",
        "Move o struct Produto também para dentro de models/.",
        "Cria uma pasta services/ com uma função que recebe []models.Task e devolve estatísticas, como a percentagem de tarefas concluídas.",
        "Confirma que o comando go build ./... corre sem erros com esta nova estrutura de pastas.",
      ],
      dicas: {
        0: `~~~
meu-projeto/
├── go.mod
├── main.go
└── task.go
~~~

Os dois ficheiros continuam a começar com package main, e podem usar-se um ao outro livremente, como se estivessem no mesmo ficheiro. A divisão é só organizacional, não cria nenhuma fronteira nova.`,

        1: `~~~
meu-projeto/
├── go.mod        // module github.com/tu/meu-projeto
├── main.go
└── models/
    └── task.go   // package models
~~~

~~~
// em main.go
import "github.com/tu/meu-projeto/models"

t := models.Task{Titulo: "Estudar"}
~~~

O caminho de import é o nome do módulo, definido no go.mod, seguido do caminho da pasta a partir da raiz do projeto. Dentro de models/task.go, os campos continuam a precisar de maiúscula inicial para serem visíveis fora do pacote.`,

        2: `O struct Produto passa da raiz do projeto para dentro de models/task.go, ou de um ficheiro próprio como models/produto.go, tal como fizeste com Task. Depois disso, no resto do código passas a escrever models.Produto em vez de só Produto.`,

        3: `~~~
package services

import "github.com/tu/meu-projeto/models"

func PercentagemConcluida(tarefas []models.Task) float64 {
    if len(tarefas) == 0 {
        return 0
    }
    concluidas := 0
    for _, t := range tarefas {
        if t.Concluida {
            concluidas++
        }
    }
    return float64(concluidas) / float64(len(tarefas)) * 100
}
~~~

Repara na conversão explícita float64(concluidas): Go não converte tipos numéricos automaticamente, nem entre int e float64, e uma divisão entre dois int daria sempre um resultado inteiro.`,

        4: `~~~
go build ./...
~~~

./... diz ao comando para procurar em todas as pastas a partir da atual. Se este comando corre sem erros, confirma que os imports entre main, models e services estão todos corretos.`,
      },
      livro: `Um único ficheiro chega para um exercício, mas não chega para um projeto que vai crescer até uma API completa. Este capítulo cobre a forma como a comunidade Go organiza projetos em pacotes, que é mais uma convenção partilhada do que uma regra imposta pela linguagem.

## Módulos e pacotes

Um módulo é a unidade de versionamento e distribuição de Go, definida pelo ficheiro go.mod na raiz do projeto. Dentro de um módulo, cada pasta com ficheiros .go é um pacote, identificado pela declaração package no topo de cada ficheiro.

~~~
meu-projeto/
├── go.mod        // module github.com/tu/meu-projeto
├── main.go       // package main
└── models/
    └── task.go   // package models
~~~

Todos os ficheiros dentro da mesma pasta têm de declarar o mesmo pacote. main.go e task.go, ambos na raiz, são package main; task.go dentro de models/ é package models, um pacote diferente, mesmo fazendo parte do mesmo módulo.

## Caminhos de import

~~~
import "github.com/tu/meu-projeto/models"

t := models.Task{Titulo: "Estudar"}
~~~

O caminho de import é o nome do módulo, definido no go.mod, seguido do caminho da pasta a partir da raiz. Para usares algo de outro pacote, tens de o prefixar com o nome do pacote, models.Task, e esse algo tem de ser exportado, com maiúscula inicial, tal como aprendeste no Bloco 1 para campos de structs. A regra de visibilidade é exatamente a mesma, só que agora aplicada à fronteira entre pacotes, não só dentro de uma struct.

## A convenção models, services, handlers

Não é uma regra da linguagem, é um padrão que a comunidade Go adotou por experiência: models/ guarda os tipos de dados, services/ guarda a lógica de negócio que opera sobre esses tipos, e, mais à frente, handlers/ vai guardar o código que liga tudo isto a pedidos HTTP.

~~~
package services

import "github.com/tu/meu-projeto/models"

func PercentagemConcluida(tarefas []models.Task) float64 {
    // ...
}
~~~

Esta separação existe para que cada pacote tenha uma única razão para mudar: alterar como calculas uma estatística não deve exigir tocar no struct Task, e vice-versa. É uma versão inicial, ainda simples, da separação em camadas que vais formalizar a sério no Bloco 9, quando lhe juntares handlers HTTP.

## go build ./... como rede de segurança

~~~
go build ./...
~~~

./... percorre o pacote atual e todos os que estão dentro dele, recursivamente. Correr isto depois de reorganizares ficheiros é a forma mais rápida de confirmares que todos os imports continuam corretos, sem teres de correr o programa todo.

A partir do Bloco 6, o projeto ganha testes e integração contínua, e a estrutura em pacotes que aqui construíste é o que torna possível testar services/ isoladamente, sem precisares de handlers/ nem de um servidor a correr.`,
    },
    {
      id: "b6",
      titulo: "Bloco 6 — Ferramentas: lint, testes e CI",
      faixa: "Ex 51–60",
      descricao: "Escrever código é metade do trabalho. A outra metade é usar ferramentas que apanham erros antes de chegarem a produção.",
      recursos: [
        { label: "golangci-lint — documentação", url: "https://golangci-lint.run/" },
        { label: "Go — pacote testing", url: "https://pkg.go.dev/testing" },
        { label: "Go by Example — Testing", url: "https://gobyexample.com/testing" },
        { label: "testify — GitHub", url: "https://github.com/stretchr/testify" },
        { label: "GitHub Actions — Go", url: "https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-go" },
      ],
      exercicios: [
        "Corre go vet ./... em todo o projeto e corrige os avisos que aparecerem.",
        "Instala o golangci-lint e corre golangci-lint run.",
        "Escreve TestResumo, um table-driven test para o método Resumo().",
        "Escreve TestVender, que testa o caso de sucesso e o caso em que ocorre ErroStockInsuficiente.",
        "Escreve TestBuscarPorID, testando tanto o caso em que o item é encontrado como o caso em que não é.",
        "Escreve TestValidarTask, testando um título vazio e um título válido.",
        "Instala o testify e reescreve um dos testes anteriores usando assert.Equal.",
        "Cria o ficheiro .github/workflows/go.yml para correr go build e go test automaticamente a cada push.",
        "Corre a suite de testes toda com go test -v ./... a partir da raiz do projeto.",
        "Compara correr os testes manualmente com deixar o CI correr sozinho a cada push, e repara na diferença que isso faz na tua confiança para alterar código.",
      ],
      dicas: {
        0: `~~~
go vet ./...
~~~

go vet analisa o código à procura de erros comuns que compilam mas provavelmente estão errados, como um Printf com o número errado de argumentos. ./... diz para verificar o pacote atual e todos os que estão dentro dele.`,

        1: `~~~
golangci-lint run
~~~

golangci-lint corre dezenas de linters em conjunto, com configuração sensata por omissão. Instala-se seguindo as instruções no site oficial, normalmente com um script de instalação ou via go install.`,

        2: `~~~
func TestResumo(t *testing.T) {
    casos := []struct {
        nome     string
        tarefa   Task
        esperado string
    }{
        {"pendente", Task{Titulo: "A", Concluida: false}, "[ ] A"},
        {"concluida", Task{Titulo: "A", Concluida: true}, "[✓] A"},
    }

    for _, c := range casos {
        t.Run(c.nome, func(t *testing.T) {
            if got := c.tarefa.Resumo(); got != c.esperado {
                t.Errorf("got %q, want %q", got, c.esperado)
            }
        })
    }
}
~~~

Um table-driven test define uma lista de casos, cada um com entrada e resultado esperado, e corre o mesmo código de verificação para todos. t.Run cria um subteste nomeado para cada caso, o que ajuda a identificar exatamente qual falhou.`,

        3: `~~~
func TestVender(t *testing.T) {
    p := Produto{Stock: 5}

    if err := p.Vender(3); err != nil {
        t.Fatalf("esperava sucesso, veio erro: %v", err)
    }

    if err := p.Vender(10); err == nil {
        t.Fatal("esperava erro de stock insuficiente, veio nil")
    }
}
~~~

t.Fatalf, ao contrário de t.Errorf, interrompe o teste de imediato. Faz sentido aqui porque, se o primeiro Vender falhar inesperadamente, não há motivo para continuar a testar o segundo caso.`,

        4: `~~~
func TestBuscarPorID(t *testing.T) {
    m := map[int]Task{1: {ID: 1, Titulo: "A"}}

    if _, err := BuscarPorID(1, m); err != nil {
        t.Errorf("esperava encontrar, veio erro: %v", err)
    }

    if _, err := BuscarPorID(99, m); err == nil {
        t.Error("esperava erro, veio nil")
    }
}
~~~`,

        5: `~~~
func TestValidarTask(t *testing.T) {
    if err := ValidarTask(Task{Titulo: ""}); err == nil {
        t.Error("esperava erro com título vazio")
    }
    if err := ValidarTask(Task{Titulo: "Algo"}); err != nil {
        t.Errorf("não esperava erro, veio: %v", err)
    }
}
~~~`,

        6: `~~~
import "github.com/stretchr/testify/assert"

func TestResumo(t *testing.T) {
    tarefa := Task{Titulo: "A", Concluida: true}
    assert.Equal(t, "[✓] A", tarefa.Resumo())
}
~~~

assert.Equal compara os dois valores e, se forem diferentes, regista o erro e mostra os dois lados de forma legível, sem precisares de escrever o if manualmente. Ao contrário de t.Fatal, não interrompe o teste logo ali.`,

        7: `~~~
# .github/workflows/go.yml
name: Go
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: "1.22"
      - run: go build ./...
      - run: go test ./...
~~~

Este ficheiro corre a cada push: descarrega o código, instala o Go, e corre o build e os testes. Se algum destes passos falhar, o GitHub marca o commit com uma cruz vermelha.`,

        8: `~~~
go test -v ./...
~~~

-v mostra o nome de cada teste à medida que corre, em vez de só o resultado final. ./... corre os testes de todos os pacotes do projeto, não só o atual.`,

        9: `Não há código para este exercício: é uma comparação de fluxo de trabalho. A diferença que vais notar é que, com CI, um erro introduzido por engano aparece assinalado no GitHub minutos depois do push, mesmo que te tenhas esquecido de correr os testes localmente antes de o fazeres.`,
      },
      livro: `Escrever código funcional é metade do trabalho. A outra metade é ter ferramentas que apanham problemas antes de chegarem a produção, e uma rede de testes que te avisa quando uma alteração parte algo que já funcionava. Este capítulo cobre as ferramentas que a comunidade Go usa no dia a dia, não os conceitos da linguagem em si.

## go vet: o que o compilador deixa passar

~~~
go vet ./...
~~~

O compilador Go verifica tipos e sintaxe, mas deixa passar erros que compilam sem problema e ainda assim estão errados, como um Printf com o número errado de argumentos para os verbos de formatação usados. go vet analisa o código à procura destes padrões suspeitos, sem correr o programa.

## Linters: um passo além do vet

golangci-lint junta dezenas de linters diferentes numa única ferramenta, com configuração sensata por omissão.

~~~
golangci-lint run
~~~

Um linter vai além de "isto está errado": sinaliza também código que funciona mas foge às convenções da comunidade, variáveis nunca usadas, complexidade excessiva numa função, nomes que não seguem a convenção Go. Não é obrigatório corrigir tudo o que um linter aponta, mas vale a pena perceberes cada aviso antes de o ignorares.

## A filosofia de testing em Go

O pacote testing da standard library é deliberadamente simples: um teste é uma função Test​Algo(t *testing.T), e reportas falhas com t.Error ou t.Fatal.

~~~
func TestResumo(t *testing.T) {
    casos := []struct {
        nome     string
        tarefa   Task
        esperado string
    }{
        {"pendente", Task{Titulo: "A"}, "[ ] A"},
        {"concluida", Task{Titulo: "A", Concluida: true}, "[✓] A"},
    }

    for _, c := range casos {
        t.Run(c.nome, func(t *testing.T) {
            if got := c.tarefa.Resumo(); got != c.esperado {
                t.Errorf("got %q, want %q", got, c.esperado)
            }
        })
    }
}
~~~

Este padrão, table-driven test, é o mais comum em Go: uma lista de casos, entrada e resultado esperado, e um único corpo de teste que os percorre a todos. t.Run cria um subteste nomeado por caso, o que ajuda a apontar exatamente qual falhou, sem teres de escrever uma função de teste por cenário.

A diferença entre t.Error e t.Fatal importa: t.Error regista a falha e continua o teste; t.Fatal interrompe-o de imediato. Usa Fatal quando o resto do teste não faz sentido depois de uma falha, por exemplo se uma operação que devia ter sucesso falhou logo no início.

## testify: menos código para a mesma verificação

~~~
import "github.com/stretchr/testify/assert"

assert.Equal(t, "[✓] A", tarefa.Resumo())
~~~

assert.Equal compara os dois valores e, se forem diferentes, mostra os dois lados de forma legível, sem precisares de escrever o if e o Errorf manualmente. Não é uma substituição do pacote testing, é uma camada por cima dele.

## CI: automatizar a confiança

~~~
# .github/workflows/go.yml
name: Go
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: "1.22" }
      - run: go build ./...
      - run: go test ./...
~~~

Este ficheiro corre a cada push: descarrega o código, instala o Go, corre o build e os testes. A diferença prática entre isto e correr os testes manualmente não é só conveniência: é que um erro introduzido por engano aparece assinalado no GitHub minutos depois, mesmo que te tenhas esquecido de correr os testes localmente antes de fazeres o push.

No Bloco 7, o projeto começa a falar JSON, e os testes que aqui aprendeste a escrever vão continuar a valer, agora também para confirmar que o Marshal e o Unmarshal fazem o que esperas.`,
    },
    {
      id: "b7",
      titulo: "Bloco 7 — JSON (encoding/decoding)",
      faixa: "Ex 61–68",
      descricao: "Uma API precisa de converter dados Go para JSON e vice-versa. É assim que ela comunica com o mundo exterior.",
      recursos: [
        { label: "Go by Example — JSON", url: "https://gobyexample.com/json" },
        { label: "pacote encoding/json", url: "https://pkg.go.dev/encoding/json" },
        { label: "JSON and Go — blog oficial", url: "https://go.dev/blog/json" },
      ],
      exercicios: [
        "Adiciona tags JSON ao struct Task: json:\"id\", json:\"titulo\" e json:\"concluida\".",
        "Usa json.Marshal(task) para converter um Task em []byte no formato JSON, e imprime o resultado como string.",
        "Usa json.Unmarshal para fazer o caminho inverso, convertendo uma string JSON de volta para um Task.",
        "Usa json.MarshalIndent para obteres o mesmo resultado, mas formatado e mais fácil de ler.",
        "Faz o marshal de um []Task inteiro e confirma que o resultado sai como um array JSON.",
        "Usa a tag json:\"desconto,omitempty\" para omitires um campo do JSON quando ele estiver vazio.",
        "Lê um ficheiro JSON com os.ReadFile e converte o conteúdo, com Unmarshal, para um slice de Tasks.",
        "Escreve um slice de Tasks para um ficheiro JSON, combinando json.Marshal com os.WriteFile.",
      ],
      dicas: {
        0: `~~~
type Task struct {
    ID        int    \`json:"id"\`
    Titulo    string \`json:"titulo"\`
    Concluida bool   \`json:"concluida"\`
}
~~~

A tag entre crases diz ao pacote encoding/json qual o nome a usar no JSON para cada campo. Sem tags, ele usaria o próprio nome do campo Go: ID, Titulo, Concluida.`,

        1: `~~~
task := Task{ID: 1, Titulo: "Estudar Go", Concluida: false}
dados, err := json.Marshal(task)
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(dados)) // {"id":1,"titulo":"Estudar Go","concluida":false}
~~~

json.Marshal devolve []byte, não string, por isso a conversão string(dados) é o que faz aparecer como texto legível no Println.`,

        2: `~~~
texto := \`{"id":1,"titulo":"Estudar Go","concluida":false}\`

var task Task
err := json.Unmarshal([]byte(texto), &task)
~~~

Unmarshal precisa de um ponteiro para a variável de destino, &task, porque é ele que vai escrever os valores lá dentro. Sem o &, estarias a passar uma cópia que se perde assim que a função termina.`,

        3: `~~~
dados, _ := json.MarshalIndent(task, "", "  ")
fmt.Println(string(dados))
~~~

O segundo argumento é um prefixo para cada linha, normalmente vazio. O terceiro é a indentação a repetir por cada nível, aqui dois espaços.`,

        4: `~~~
tarefas := []Task{{ID: 1, Titulo: "A"}, {ID: 2, Titulo: "B"}}
dados, _ := json.Marshal(tarefas)
fmt.Println(string(dados)) // [{"id":1,...},{"id":2,...}]
~~~

json.Marshal funciona sobre slices tal como sobre valores individuais: um []Task vira um array JSON, um Task sozinho vira um objeto.`,

        5: `~~~
type Produto struct {
    Nome     string  \`json:"nome"\`
    Desconto float64 \`json:"desconto,omitempty"\`
}
~~~

Com omitempty, o campo só aparece no JSON se tiver um valor diferente do valor zero do seu tipo. Para float64, isso significa que Desconto só sai se for diferente de 0.`,

        6: `~~~
dados, err := os.ReadFile("tarefas.json")
if err != nil {
    log.Fatal(err)
}

var tarefas []Task
err = json.Unmarshal(dados, &tarefas)
~~~

os.ReadFile lê o ficheiro todo de uma vez para []byte, que é exatamente o que Unmarshal espera receber.`,

        7: `~~~
dados, err := json.Marshal(tarefas)
if err != nil {
    log.Fatal(err)
}
err = os.WriteFile("tarefas.json", dados, 0644)
~~~

0644 são as permissões do ficheiro criado, no formato Unix habitual: leitura e escrita para o dono, só leitura para os outros.`,
      },
      livro: `Uma API precisa de converter dados Go para JSON, e JSON de volta para dados Go: é assim que comunica com o mundo exterior, seja um browser, uma aplicação móvel, ou outro serviço. O pacote encoding/json da standard library trata disto sem precisares de nenhuma biblioteca externa.

## Tags de struct: o mapeamento entre Go e JSON

~~~
type Task struct {
    ID        int    \`json:"id"\`
    Titulo    string \`json:"titulo"\`
    Concluida bool   \`json:"concluida"\`
}
~~~

A tag entre crases, depois de cada campo, diz ao pacote encoding/json que nome usar no JSON para esse campo. Sem tags, ele usaria o próprio nome do campo Go, ID, Titulo, Concluida, exatamente como estão escritos, com maiúscula inicial incluída, o que raramente é o formato que queres expor numa API.

## Marshal: de Go para JSON

~~~
dados, err := json.Marshal(task)
fmt.Println(string(dados)) // {"id":1,"titulo":"Estudar Go","concluida":false}
~~~

json.Marshal devolve []byte, não string, por isso precisas da conversão string(dados) para veres texto legível. Funciona sobre qualquer valor, incluindo slices inteiros: um []Task vira um array JSON, sem precisares de percorrer a lista à mão.

Para JSON formatado e mais fácil de ler, existe json.MarshalIndent, que aceita um prefixo de linha e uma string de indentação a repetir por cada nível de aninhamento.

## Unmarshal: o caminho inverso

~~~
var task Task
err := json.Unmarshal(dados, &task)
~~~

Unmarshal precisa de um ponteiro para o destino, &task, porque é ele que escreve os valores lá dentro. Sem o &, estarias a passar uma cópia que se perde assim que a função termina, exatamente o mesmo princípio de pointer receiver que viste no Bloco 1.

## omitempty e os valores zero

~~~
type Produto struct {
    Nome     string  \`json:"nome"\`
    Desconto float64 \`json:"desconto,omitempty"\`
}
~~~

Com omitempty, um campo só aparece no JSON de saída se tiver um valor diferente do valor zero do seu tipo: 0 para números, "" para strings, false para bool, nil para ponteiros e slices. É útil para campos opcionais, onde a ausência no JSON tem significado diferente de um valor explicitamente zero.

## Ficheiros como armazenamento temporário

~~~
dados, _ := os.ReadFile("tarefas.json")
var tarefas []Task
json.Unmarshal(dados, &tarefas)

// e o caminho inverso
dados, _ = json.Marshal(tarefas)
os.WriteFile("tarefas.json", dados, 0644)
~~~

Antes de teres uma base de dados a sério, um ficheiro JSON é uma forma simples de persistência: lês tudo para memória ao arrancar, escreves tudo de volta quando algo muda. Não escala, e não aguenta acesso concorrente sem cuidado extra, mas é suficiente para os exercícios até ao Bloco 12, e é exatamente o mesmo padrão que vais usar para gerar relatórios exportáveis nos domínios práticos.

No Bloco 8, este JSON deixa de viver só em ficheiros e passa a ser o corpo de pedidos e respostas HTTP.`,
    },
    {
      id: "b8",
      titulo: "Bloco 8 — net/http básico",
      faixa: "Ex 69–78",
      descricao: "O pacote net/http da standard library já permite construir um servidor web completo, sem bibliotecas externas.",
      recursos: [
        { label: "Go by Example — HTTP Servers", url: "https://gobyexample.com/http-servers" },
        { label: "Go by Example — HTTP Clients", url: "https://gobyexample.com/http-clients" },
        { label: "pacote net/http", url: "https://pkg.go.dev/net/http" },
        { label: "Go Web Examples", url: "https://gowebexamples.com/" },
      ],
      exercicios: [
        "Cria um servidor HTTP mínimo com http.HandleFunc(\"/\", handler) e http.ListenAndServe(\":8080\", nil).",
        "Cria um handler que responde \"pong\" quando a rota /ping é chamada.",
        "Cria um handler que lê um query param, de forma que /saudacao?nome=Clesio responda \"Olá, Clesio\".",
        "Cria um handler que responde em JSON, definindo o Content-Type correto e usando json.NewEncoder(w).Encode(tarefas).",
        "Usa http.Error(w, \"mensagem\", http.StatusNotFound) para devolveres um erro HTTP com o código correto.",
        "Lê o método do pedido através de r.Method e responde de forma diferente consoante seja GET ou POST.",
        "Lê o corpo de um pedido POST com json.NewDecoder(r.Body).Decode(&task).",
        "Cria um middleware simples que envolve um handler e imprime, com time.Since, quanto tempo a resposta demorou.",
        "Testa os teus endpoints com curl ou com uma ferramenta como Postman ou Insomnia.",
        "O objetivo deste bloco é perceberes net/http puro antes de passares a usar um router.",
      ],
      dicas: {
        0: `~~~
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Olá!")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
~~~

ListenAndServe bloqueia o programa ali, a aceitar pedidos, até o processo ser terminado ou ocorrer um erro fatal. w é onde escreves a resposta, r é o pedido recebido.`,

        1: `~~~
http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "pong")
})
~~~`,

        2: `~~~
http.HandleFunc("/saudacao", func(w http.ResponseWriter, r *http.Request) {
    nome := r.URL.Query().Get("nome")
    fmt.Fprintf(w, "Olá, %s", nome)
})
~~~

r.URL.Query() devolve os parâmetros da query string como um map. Get("nome") devolve a string vazia se o parâmetro não existir, em vez de erro.`,

        3: `~~~
http.HandleFunc("/tarefas", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tarefas)
})
~~~

O Content-Type diz ao cliente que formato esperar. json.NewEncoder(w).Encode escreve o JSON diretamente para w, sem precisares de o converter primeiro para []byte.`,

        4: `~~~
http.HandleFunc("/tarefas/99", func(w http.ResponseWriter, r *http.Request) {
    http.Error(w, "tarefa não encontrada", http.StatusNotFound)
})
~~~

http.Error define o código de estado e escreve a mensagem no corpo da resposta, tudo numa só chamada. http.StatusNotFound é só o número 404 com um nome legível.`,

        5: `~~~
http.HandleFunc("/tarefas", func(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case http.MethodGet:
        fmt.Fprintln(w, "a listar tarefas")
    case http.MethodPost:
        fmt.Fprintln(w, "a criar tarefa")
    default:
        http.Error(w, "método não suportado", http.StatusMethodNotAllowed)
    }
})
~~~`,

        6: `~~~
var task Task
err := json.NewDecoder(r.Body).Decode(&task)
if err != nil {
    http.Error(w, "JSON inválido", http.StatusBadRequest)
    return
}
~~~

r.Body é o corpo do pedido, e comporta-se como um leitor de onde só se lê uma vez. Decode faz o parse diretamente a partir daí, sem precisares de ler tudo para uma variável intermédia primeiro.`,

        7: `~~~
func comLog(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        inicio := time.Now()
        next(w, r)
        fmt.Println(r.URL.Path, time.Since(inicio))
    }
}

http.HandleFunc("/ping", comLog(handler))
~~~

Um middleware é uma função que recebe um handler e devolve outro handler que o envolve. comLog corre código antes e depois de chamar next, sem o handler original precisar de saber que está a ser cronometrado.`,

        8: `~~~
curl http://localhost:8080/ping
curl "http://localhost:8080/saudacao?nome=Ana"
curl -X POST http://localhost:8080/tarefas -d "{\"titulo\":\"Nova\"}"
~~~

-X define o método HTTP, -d envia um corpo no pedido. Sem -X, o curl assume GET por omissão.`,

        9: `Não há código novo aqui: é o momento de perceberes o que um router como o chi, que vais usar já no próximo bloco, está de facto a poupar-te. Sem ele, cada rota nova significa mais um if a comparar r.URL.Path à mão.`,
      },
      livro: `O pacote net/http da standard library já permite construir um servidor web completo, sem nenhuma biblioteca externa. Este capítulo cobre o suficiente de net/http puro para perceberes, no Bloco 9, exatamente o que um router como o chi está a poupar-te.

## O modelo de um servidor HTTP em Go

~~~
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Olá!")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
~~~

http.HandleFunc regista uma função para responder a uma rota. http.ListenAndServe arranca o servidor e bloqueia o programa ali, a aceitar pedidos, até o processo terminar. Cada pedido recebido corre numa goroutine própria, gerida automaticamente pelo pacote, o que significa que o teu handler já lida com múltiplos pedidos em simultâneo sem teres de escrever nada de concorrência explicitamente, algo que só vais formalizar a sério no Nível 2.

w, o http.ResponseWriter, é onde escreves a resposta. r, o *http.Request, é o pedido recebido, com o método, o URL, os cabeçalhos e o corpo.

## Ler informação do pedido

~~~
nome := r.URL.Query().Get("nome")           // query string: ?nome=Ana
r.Method                                     // "GET", "POST", ...
json.NewDecoder(r.Body).Decode(&task)        // corpo do pedido
~~~

r.URL.Query() devolve os parâmetros da query string como um map; Get devolve string vazia se o parâmetro não existir, sem erro. r.Body comporta-se como um leitor de onde só se lê uma vez, e Decode faz o parse diretamente a partir daí, sem precisares de uma variável intermédia.

## Responder com o código de estado certo

~~~
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(tarefas)

http.Error(w, "não encontrada", http.StatusNotFound)
~~~

Os códigos de estado HTTP dividem-se em famílias: 2xx significa sucesso, 4xx significa que o pedido do cliente tem um problema, 5xx significa que o problema é do servidor. Escolher o código certo não é só formalidade: é o que permite a quem consome a tua API reagir programaticamente, sem teres de documentar cada caso à parte.

## Middlewares: envolver um handler com outro

~~~
func comLog(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        inicio := time.Now()
        next(w, r)
        fmt.Println(r.URL.Path, time.Since(inicio))
    }
}

http.HandleFunc("/ping", comLog(handler))
~~~

Um middleware é uma função que recebe um handler e devolve outro handler que o envolve. comLog corre código antes e depois de chamar next, o handler original, sem que esse handler precise de saber que está a ser cronometrado. É o mesmo princípio que torna interfaces úteis, uma peça que não sabe nada sobre quem a está a usar por fora, e é exatamente o padrão que o chi formaliza no bloco seguinte, com r.Use.

O objetivo deste bloco não é só construíres um servidor: é perceberes o suficiente de net/http puro para, no Bloco 9, apreciares o que um router como o chi resolve por ti, e não tratares essa biblioteca como magia.`,
    },
    {
      id: "b9",
      titulo: "Bloco 9 — Router chi + estrutura de API",
      faixa: "Ex 79–85",
      descricao: "net/http sozinho fica limitado à medida que a API cresce; chi é um router leve que resolve isso sem ficar pesado.",
      recursos: [
        { label: "chi — documentação oficial", url: "https://github.com/go-chi/chi" },
        { label: "chi — exemplos oficiais", url: "https://github.com/go-chi/chi/tree/master/_examples" },
      ],
      exercicios: [
        "Instala o chi e substitui http.HandleFunc por r := chi.NewRouter().",
        "Cria uma rota com parâmetro, usando r.Get(\"/tasks/{id}\", handler) e lendo o valor com chi.URLParam(r, \"id\").",
        "Agrupa rotas relacionadas com r.Route(\"/tasks\", func(r chi.Router) { ... }).",
        "Usa um middleware do próprio chi, como r.Use(middleware.Logger).",
        "Organiza os handlers num ficheiro próprio, handlers/task_handler.go.",
        "Separa o projeto em três camadas: handler, que recebe o pedido HTTP; service, com a regra de negócio; e repository, que por agora guarda os dados em memória com um map.",
        "Explica por escrito por que razão separaste o projeto em camadas.",
      ],
      dicas: {
        0: `~~~
r := chi.NewRouter()
r.Get("/ping", handler)
http.ListenAndServe(":8080", r)
~~~

chi.NewRouter() devolve algo que também satisfaz a interface http.Handler, por isso passa-se diretamente a ListenAndServe, tal como antes fazias com nil.`,

        1: `~~~
r.Get("/tasks/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    fmt.Fprintln(w, "tarefa", id)
})
~~~

{id} na rota é um segmento variável. chi.URLParam lê o valor que veio nesse segmento para o pedido atual, sempre como string, mesmo que represente um número.`,

        2: `~~~
r.Route("/tasks", func(r chi.Router) {
    r.Get("/", listarHandler)
    r.Post("/", criarHandler)
    r.Get("/{id}", obterHandler)
})
~~~

Dentro do Route, as rotas ficam relativas ao prefixo /tasks. Isto evita repetires /tasks no início de cada uma.`,

        3: `~~~
r.Use(middleware.Logger)
~~~

r.Use regista um middleware que se aplica a todas as rotas definidas depois dele. middleware.Logger já vem incluído no pacote chi/middleware, e regista cada pedido recebido.`,

        4: `Move cada handler para handlers/task_handler.go, com package handlers no topo. No ficheiro principal, importa o pacote e regista as rotas normalmente: r.Get("/tasks", handlers.Listar).`,

        5: `O handler recebe o pedido HTTP e chama o service. O service tem a regra de negócio, como validações, e chama o repository. O repository só sabe guardar e procurar dados, sem saber nada de HTTP nem das regras que os rodeiam.`,

        6: `Sem código para este: escreve as tuas conclusões em comentário ou num ficheiro à parte. A ideia central costuma ser: cada camada só conhece a que está imediatamente a seguir a ela, o que torna possível testar o service sem precisares de um servidor a correr.`,
      },
      livro: `net/http sozinho fica limitado à medida que uma API cresce: rotas com parâmetros exigem parsing manual do URL, agrupar rotas relacionadas não tem apoio nenhum, middlewares têm de ser aplicados um a um. chi é um router leve que resolve isto sem se tornar um framework pesado.

## chi.NewRouter como substituto direto

~~~
r := chi.NewRouter()
r.Get("/ping", handler)
http.ListenAndServe(":8080", r)
~~~

chi.NewRouter() devolve algo que também satisfaz http.Handler, a mesma interface que nil satisfazia implicitamente antes. É por isto que passa diretamente para ListenAndServe: chi não substitui net/http, constrói-se por cima dele.

## Rotas com parâmetros

~~~
r.Get("/tasks/{id}", func(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
})
~~~

{id} marca um segmento variável do URL. chi.URLParam lê o valor recebido nesse segmento, sempre como string, mesmo que represente um número, o que significa que continuas a precisar de strconv.Atoi para o converteres, tal como farias sem router nenhum.

## Agrupar rotas relacionadas

~~~
r.Route("/tasks", func(r chi.Router) {
    r.Get("/", listarHandler)
    r.Post("/", criarHandler)
    r.Get("/{id}", obterHandler)
})
~~~

Dentro do Route, as rotas ficam relativas ao prefixo /tasks, o que evita repeti-lo em cada uma, e torna visível, de relance, que grupo de endpoints pertence à mesma entidade.

## Middlewares do próprio chi

~~~
r.Use(middleware.Logger)
~~~

r.Use regista um middleware que se aplica a todas as rotas definidas depois dele. middleware.Logger, incluído no pacote chi/middleware, regista cada pedido recebido, exatamente o que construíste à mão no Bloco 8, já pronto a usar.

## Arquitetura em camadas: handler, service, repository

Com um router a tratar do encaminhamento, o próximo passo natural é separar responsabilidades dentro de cada rota:

~~~
handler   → recebe o pedido HTTP, lê o corpo, escreve a resposta
service   → aplica a regra de negócio, validações, cálculos
repository → guarda e procura dados, por agora em memória com um map
~~~

Cada camada só conhece a camada imediatamente a seguir: o handler chama o service, o service chama o repository, e nenhum sabe dos detalhes internos do outro. É esta separação que torna possível, no Bloco 11, testar o service sem precisares de um servidor HTTP a correr, e é o que vais formalizar de forma muito mais rigorosa no Nível 2, com injeção de dependências a sério.

No Bloco 10 juntas tudo isto num CRUD completo: as quatro operações fundamentais, sobre a estrutura em camadas que aqui desenhaste.`,
    },
    {
      id: "b10",
      titulo: "Bloco 10 — CRUD completo em memória",
      faixa: "Ex 86–92",
      descricao: "Junta tudo: uma API real de gestão de tarefas, com as quatro operações fundamentais.",
      recursos: [
        { label: "Reaproveita recursos dos Blocos 7, 8 e 9", url: "" },
      ],
      exercicios: [
        "Implementa POST /tasks, que cria uma nova Task e gera o ID automaticamente através de um contador incremental.",
        "Implementa GET /tasks, que lista todas as tarefas existentes.",
        "Implementa GET /tasks/{id}, que devolve uma tarefa específica, ou 404 quando ela não existir.",
        "Implementa PUT /tasks/{id}, que atualiza o título e/ou o estado de uma tarefa.",
        "Implementa DELETE /tasks/{id}, que remove uma tarefa.",
        "Implementa PATCH /tasks/{id}/concluir, um endpoint dedicado que só marca a tarefa como concluída.",
        "Adiciona validação, de forma que um POST com o título vazio devolva 400 Bad Request com uma mensagem clara.",
      ],
      dicas: {
        0: `~~~
var proximoID = 1

func criarTask(w http.ResponseWriter, r *http.Request) {
    var task Task
    json.NewDecoder(r.Body).Decode(&task)
    task.ID = proximoID
    proximoID++
    tarefas[task.ID] = task
    json.NewEncoder(w).Encode(task)
}
~~~

Um contador simples numa variável package-level é suficiente para uma API em memória. Numa base de dados a sério, isto seria substituído por uma coluna auto-incremento ou por um identificador gerado, como um UUID.`,

        1: `~~~
func listarTasks(w http.ResponseWriter, r *http.Request) {
    var lista []Task
    for _, t := range tarefas {
        lista = append(lista, t)
    }
    json.NewEncoder(w).Encode(lista)
}
~~~`,

        2: `~~~
func obterTask(w http.ResponseWriter, r *http.Request) {
    id, _ := strconv.Atoi(chi.URLParam(r, "id"))
    task, ok := tarefas[id]
    if !ok {
        http.Error(w, "não encontrada", http.StatusNotFound)
        return
    }
    json.NewEncoder(w).Encode(task)
}
~~~

strconv.Atoi converte a string do parâmetro para int. Como o id vem sempre como texto do URL, precisas desta conversão antes de o usares como chave do map.`,

        3: `~~~
func atualizarTask(w http.ResponseWriter, r *http.Request) {
    id, _ := strconv.Atoi(chi.URLParam(r, "id"))
    task, ok := tarefas[id]
    if !ok {
        http.Error(w, "não encontrada", http.StatusNotFound)
        return
    }
    json.NewDecoder(r.Body).Decode(&task)
    task.ID = id
    tarefas[id] = task
    json.NewEncoder(w).Encode(task)
}
~~~

task.ID = id depois do Decode garante que o identificador da tarefa não muda, mesmo que o corpo do pedido traga um id diferente por engano.`,

        4: `~~~
func removerTask(w http.ResponseWriter, r *http.Request) {
    id, _ := strconv.Atoi(chi.URLParam(r, "id"))
    delete(tarefas, id)
    w.WriteHeader(http.StatusNoContent)
}
~~~

204 No Content é a resposta convencional para uma remoção bem-sucedida, sem corpo nenhum a devolver.`,

        5: `~~~
func concluirTask(w http.ResponseWriter, r *http.Request) {
    id, _ := strconv.Atoi(chi.URLParam(r, "id"))
    task, ok := tarefas[id]
    if !ok {
        http.Error(w, "não encontrada", http.StatusNotFound)
        return
    }
    task.Concluida = true
    tarefas[id] = task
    json.NewEncoder(w).Encode(task)
}
~~~

Um endpoint dedicado como este evita que o cliente tenha de enviar a tarefa inteira só para mudar um campo, o que seria o caso se usasses PUT para isto.`,

        6: `~~~
if task.Titulo == "" {
    http.Error(w, "o título é obrigatório", http.StatusBadRequest)
    return
}
~~~

Esta verificação entra logo a seguir ao Decode, antes de guardares fosse o que fosse. 400 Bad Request é o código correto quando o problema está nos dados que o cliente enviou.`,
      },
      livro: `Este bloco não introduz conceitos novos, junta os que já tens: router, camadas, JSON, structs. O resultado é uma API real de gestão de tarefas, com as quatro operações que qualquer sistema que guarda dados precisa de suportar.

## As quatro operações e os verbos HTTP certos

~~~
POST   /tasks       cria
GET    /tasks       lista
GET    /tasks/{id}  obtém uma específica
PUT    /tasks/{id}  atualiza
DELETE /tasks/{id}  remove
~~~

Esta correspondência entre operação e verbo HTTP não é arbitrária, é uma convenção que quem consome APIs espera encontrar: POST para criar algo novo, cujo identificador ainda não existe; GET para ler, sem efeitos secundários; PUT para substituir por completo um recurso existente; DELETE para o remover. Seguir a convenção poupa-te de teres de documentar decisões que, de outra forma, cada cliente teria de adivinhar.

## Um endpoint dedicado quando a operação é específica

~~~
PATCH /tasks/{id}/concluir
~~~

Nem toda a alteração justifica um PUT completo. Marcar uma tarefa como concluída é uma operação específica, com um significado próprio, e um endpoint dedicado, com PATCH, evita que o cliente tenha de enviar a tarefa inteira só para mudar um campo.

## Idempotência: porque PUT e DELETE se podem repetir sem medo

Uma operação é idempotente quando repeti-la produz o mesmo resultado que executá-la uma única vez. PUT e DELETE são pensados para serem idempotentes: atualizar uma tarefa com os mesmos dados duas vezes deixa-a no mesmo estado; remover uma tarefa que já foi removida não devia causar um erro diferente da primeira remoção. POST, pelo contrário, normalmente não é idempotente: chamá-lo duas vezes cria dois recursos, não um. Esta distinção importa na prática porque um cliente de rede instável pode reenviar um pedido sem saber se o primeiro chegou a ser processado, e só operações idempotentes são seguras de reenviar às cegas.

## Validação à entrada

~~~
if task.Titulo == "" {
    http.Error(w, "o título é obrigatório", http.StatusBadRequest)
    return
}
~~~

400 Bad Request é o código certo quando o problema está nos dados que o cliente enviou, distinto de 404, que significa que o recurso pedido não existe, ou de 500, que significa que o problema é do teu lado. Validar cedo, logo a seguir ao Decode e antes de tocares em qualquer estado, evita que dados inválidos cheguem a ser gravados.

No Bloco 11, vais escrever testes para as regras de negócio que aqui implementaste, sem precisares de um servidor a correr para os correr.`,
    },
    {
      id: "b11",
      titulo: "Bloco 11 — Testes das regras de negócio",
      faixa: "Ex 93–97",
      descricao: "Testar a lógica de negócio isoladamente torna os testes rápidos e fáceis de correr centenas de vezes por dia.",
      recursos: [
        { label: "Reaproveita recursos do Bloco 6", url: "" },
      ],
      exercicios: [
        "Escreve TestCriarTask, testando diretamente a função do service, sem passar pelo handler HTTP.",
        "Escreve TestConcluirTask, seguindo a mesma ideia para a operação de concluir uma tarefa.",
        "Escreve TestListarTarefasPendentes, reaproveitando a lógica de filtro que já criaste no Bloco 2.",
        "Testa o repository isoladamente, confirmando que Adicionar e BuscarPorID funcionam corretamente em conjunto.",
        "Corre go test -v ./... em todo o projeto e confirma que todos os testes passam.",
      ],
      dicas: {
        0: `~~~
func TestCriarTask(t *testing.T) {
    repo := NewRepositorioMemoria()
    service := NewTaskService(repo)

    task, err := service.Criar("Estudar Go")
    if err != nil {
        t.Fatalf("erro inesperado: %v", err)
    }
    if task.Titulo != "Estudar Go" {
        t.Errorf("titulo = %q, want %q", task.Titulo, "Estudar Go")
    }
}
~~~

Nenhum servidor HTTP entra aqui. O teste chama diretamente o service, com um repository em memória, o que o torna rápido e independente de rede ou porta ocupada.`,

        1: `~~~
func TestConcluirTask(t *testing.T) {
    repo := NewRepositorioMemoria()
    repo.Adicionar(Task{ID: 1, Titulo: "A"})
    service := NewTaskService(repo)

    err := service.Concluir(1)
    if err != nil {
        t.Fatalf("erro inesperado: %v", err)
    }

    task, _ := repo.BuscarPorID(1)
    if !task.Concluida {
        t.Error("esperava a tarefa concluída")
    }
}
~~~

O teste prepara o estado inicial diretamente no repository, chama a operação através do service, e depois confirma o resultado voltando a ler do repository.`,

        2: `~~~
func TestListarTarefasPendentes(t *testing.T) {
    tarefas := []Task{
        {Titulo: "A", Concluida: false},
        {Titulo: "B", Concluida: true},
    }
    pendentes := TarefasPendentes(tarefas)
    if len(pendentes) != 1 {
        t.Errorf("len = %d, want 1", len(pendentes))
    }
}
~~~

A mesma função TarefasPendentes que escreveste no Bloco 2, só que agora com um teste a confirmar o comportamento em vez de a verificares a olho.`,

        3: `~~~
func TestRepositorioMemoria(t *testing.T) {
    repo := NewRepositorioMemoria()
    repo.Adicionar(Task{ID: 1, Titulo: "A"})

    task, err := repo.BuscarPorID(1)
    if err != nil {
        t.Fatalf("erro inesperado: %v", err)
    }
    if task.Titulo != "A" {
        t.Errorf("titulo = %q, want %q", task.Titulo, "A")
    }
}
~~~`,

        4: `~~~
go test -v ./...
~~~

Se tudo o que escreveste nos blocos anteriores estiver bem ligado, este comando deve terminar sem nenhum FAIL. É o momento de confirmares o projeto todo de uma vez.`,
      },
      livro: `Com handler, service e repository separados desde o Bloco 9, a maior parte da lógica de negócio testa-se sem servidor nem base de dados nenhuma. Este bloco é sobre tirar partido dessa separação.

## Testar o service sem servidor

~~~
func TestCriarTask(t *testing.T) {
    repo := NewRepositorioMemoria()
    service := NewTaskService(repo)

    task, err := service.Criar("Estudar Go")
    if err != nil {
        t.Fatalf("erro inesperado: %v", err)
    }
    if task.Titulo != "Estudar Go" {
        t.Errorf("titulo = %q, want %q", task.Titulo, "Estudar Go")
    }
}
~~~

O teste chama o service diretamente, com um repository em memória, sem nenhum servidor HTTP a correr. Isto torna o teste rápido, e independente de detalhes que não interessam à regra de negócio em si, como uma porta ocupada ou latência de rede.

## Testar o repository isoladamente

~~~
func TestRepositorioMemoria(t *testing.T) {
    repo := NewRepositorioMemoria()
    repo.Adicionar(Task{ID: 1, Titulo: "A"})

    task, err := repo.BuscarPorID(1)
    if err != nil {
        t.Fatalf("erro inesperado: %v", err)
    }
    if task.Titulo != "A" {
        t.Errorf("titulo = %q, want %q", task.Titulo, "A")
    }
}
~~~

Testar cada camada separadamente, e não só o sistema inteiro de ponta a ponta, tem uma vantagem prática: quando um teste falha, o nome da função de teste já te diz aproximadamente onde procurar. Um teste end-to-end que falha só te diz que algo, algures, está errado.

## Uma suite que confia em si própria

~~~
go test -v ./...
~~~

Se as camadas anteriores estiverem bem separadas, este comando corre em segundos, não minutos, mesmo com dezenas de testes. É essa velocidade que torna prático correr a suite toda antes de cada commit, em vez de só de vez em quando: um teste que demora minutos a correr acaba por não correr.

No Bloco 12, tudo o que construíste nos blocos anteriores junta-se numa única entrega: a API completa, documentada, e publicada onde outra pessoa a consegue testar.`,
    },
    {
      id: "b12",
      titulo: "Bloco 12 — Projeto final: deploy da API",
      faixa: "Ex 98–100",
      descricao: "Junta tudo numa API CRUD completa, publicada e testável a partir de fora da tua máquina.",
      recursos: [
        { label: "Render — Deploy a Go app", url: "https://render.com/docs/deploy-go-nethttp" },
        { label: "Railway — documentação", url: "https://docs.railway.app/" },
        { label: "Writing a README", url: "https://www.makeareadme.com/" },
      ],
      exercicios: [
        "Junta tudo numa API CRUD completa: arquitetura em camadas, JSON, validação de erros e os testes das regras de negócio.",
        "Escreve um README curto que explique cada endpoint: método, rota, e um exemplo de request e de response.",
        "Faz o deploy da API no Render ou no Railway, e testa-a a partir de fora da tua máquina usando curl.",
      ],
      dicas: {
        0: `~~~
meu-projeto/
├── go.mod
├── main.go
├── models/
├── services/
├── handlers/
└── handlers/handler_test.go
~~~

Não há código novo neste exercício: é o momento de olhares para tudo o que já construíste nos blocos anteriores e verificares que continua a encaixar como um todo coerente.`,

        1: `~~~
## POST /tasks
Cria uma nova tarefa.

Request:
{"titulo": "Estudar Go"}

Response: 201
{"id": 1, "titulo": "Estudar Go", "concluida": false}
~~~

Repete esta estrutura, método, rota, exemplo de request, exemplo de response, para cada endpoint que construíste no Bloco 10.`,

        2: `~~~
curl https://a-tua-api.onrender.com/tasks
~~~

Testar a partir de fora da tua máquina confirma que o deploy está mesmo acessível publicamente, e não só a funcionar no teu localhost.`,
      },
      livro: `Este é o bloco de fechar: não introduz nada de novo na linguagem, pede-te para olhares para tudo o que construíste nos blocos anteriores como um todo coerente, e para o tornares acessível a alguém que não seja tu, na tua máquina.

## Documentar uma API com um README

~~~
## POST /tasks
Cria uma nova tarefa.

Request:
{"titulo": "Estudar Go"}

Response: 201
{"id": 1, "titulo": "Estudar Go", "concluida": false}
~~~

Um README curto, com método, rota, e um exemplo de pedido e de resposta para cada endpoint, é muitas vezes a diferença entre alguém conseguir usar a tua API em cinco minutos ou desistir. Não precisa de ferramentas especiais nem de geração automática a partir do código: um ficheiro Markdown simples, escrito à mão, já resolve a maior parte do problema.

## Escolher onde fazer o deploy

Render e Railway são duas plataformas com planos gratuitos suficientes para um projeto deste tamanho. Ambas seguem o mesmo princípio geral: ligas o repositório do GitHub, defines o comando de build e o comando de arranque, e a plataforma trata do resto, incluindo HTTPS e reinícios automáticos se o processo cair.

A diferença prática entre as duas costuma estar em detalhes de configuração e nos limites do plano gratuito, não em capacidades fundamentais. Para um projeto deste tamanho, qualquer uma serve.

## Testar a partir de fora

~~~
curl https://a-tua-api.onrender.com/tasks
~~~

Testar a partir de fora da tua máquina, depois do deploy, confirma algo que correr localmente não confirma: que a aplicação está mesmo acessível publicamente, com as variáveis de ambiente certas, sem depender de nada que só existia no teu computador.

Isto fecha o Nível 1. O que vem a seguir, no Nível 2, não é mais do mesmo em maior escala: é um conjunto de problemas que só aparecem quando um sistema tem de aguentar carga real, falhas parciais, e mais do que uma pessoa a mexer nele ao mesmo tempo, a começar por context.Context e por concorrência com goroutines.`,
    },
  ],
};

const TRILHA_DOMINIOS = {
  id: "dominios",
  titulo: "Domínios práticos",
  intro: "4 domínios práticos para consolidares composição e interfaces em Go, trocando herança e classes abstratas por um struct base embutido e comportamento definido através de interfaces. Encaixa depois do Bloco 4 e antes ou durante o Bloco 10.",
  blocos: [
    {
      id: "d1",
      titulo: "Domínio 1 — LAM: Gestão de Passagens de Voo",
      faixa: "12 exercícios",
      descricao: "Sistema de gestão de passagens de voo com dois tipos de passagem: internacional (direta ou em trânsito) e doméstica. Modela-se com um struct base embutido e uma interface para o comportamento que varia entre os tipos.",
      recursos: [],
      encaixaDepoisDe: "b4",
      reaproveitaEm: ["b7", "b9", "b10"],
      exercicios: [
        "Cria o struct base Passagem, com os campos CodigoVoo, Nome, Apelido, DataPartida, HoraPartida, HoraChegada, Estado, Origem e Destino, todos string, e ValorBase float64.",
        "Cria a interface CalculadoraValor, com o método ValorFinal() float64.",
        "Cria o struct PassagemInternacional, que embute Passagem e adiciona os campos TemVisto, Directo e RefeicaoExtra bool, e HorasTransito int. Implementa ValorFinal() seguindo estas regras: uma passagem direta com refeição extra soma 3000 ao valor; uma passagem em trânsito entre 6 e 12 horas tem desconto de 10%; uma passagem em trânsito acima de 12 horas dá direito a hotel; a ausência de visto acrescenta uma taxa de 25%; e todas as passagens incluem 16% de IVA.",
        "Cria o struct PassagemDomestica, que embute Passagem e adiciona o campo Periodo string. Implementa ValorFinal(): o período da tarde paga mais 10%, o da noite paga mais 20%, e todas incluem 16% de IVA.",
        "Implementa LerPassagensDeFicheiro(caminho string) ([]CalculadoraValor, error), que lê um ficheiro com pelo menos 20 linhas e devolve um slice da interface. Repara que consegues guardar os dois tipos concretos no mesmo slice: isto é polimorfismo em Go.",
        "Implementa ContarPorTipo(passagens []CalculadoraValor) (internacionais, domesticas int), usando type assertion ou type switch para distinguir os dois tipos.",
        "Implementa ValorTotalPago(passagens []CalculadoraValor) float64, que soma o ValorFinal() de todas as passagens sem precisar de saber o tipo concreto de cada uma.",
        "Implementa PassagensDoMes(passagens []CalculadoraValor, mes int) []CalculadoraValor, que filtra as passagens pelo mês da DataPartida.",
        "Implementa SituacaoEmpresa(valorTotal, orcamento float64) (lucro bool, valor float64), aplicando a regra do orçamento de 750.000,00Mts.",
        "Constrói a versão em linha de comandos: um menu no terminal com as opções ler ficheiro, listar por tipo, calcular total, cancelar por código de voo e sair.",
        "Constrói a versão em API: os endpoints GET /passagens, GET /passagens/tipo/{tipo}, GET /passagens/total e DELETE /passagens/{codigoVoo}.",
        "Como bónus, gera um relatório exportável em JSON, com json.MarshalIndent, ou em CSV, em vez de PDF.",
      ],
      dicas: {
        0: `~~~
type Passagem struct {
    CodigoVoo   string
    Nome        string
    Apelido     string
    DataPartida string
    HoraPartida string
    HoraChegada string
    Estado      string
    Origem      string
    Destino     string
    ValorBase   float64
}
~~~`,

        1: `~~~
type CalculadoraValor interface {
    ValorFinal() float64
}
~~~`,

        2: `~~~
type PassagemInternacional struct {
    Passagem
    TemVisto      bool
    Directo       bool
    RefeicaoExtra bool
    HorasTransito int
}

func (p PassagemInternacional) ValorFinal() float64 {
    valor := p.ValorBase

    if p.Directo && p.RefeicaoExtra {
        valor += 3000
    }
    if !p.Directo && p.HorasTransito >= 6 && p.HorasTransito <= 12 {
        valor *= 0.9
    }
    if !p.TemVisto {
        valor *= 1.25
    }
    valor *= 1.16 // IVA

    return valor
}
~~~

O método vai aplicando cada regra por cima do valor acumulado até ali, e só no fim acrescenta o IVA. A regra do hotel para trânsito acima de 12 horas não altera o preço aqui, é uma condição que registarias separadamente se precisasses dela.`,

        3: `~~~
type PassagemDomestica struct {
    Passagem
    Periodo string
}

func (p PassagemDomestica) ValorFinal() float64 {
    valor := p.ValorBase

    switch p.Periodo {
    case "tarde":
        valor *= 1.1
    case "noite":
        valor *= 1.2
    }

    return valor * 1.16
}
~~~`,

        4: `~~~
func LerPassagensDeFicheiro(caminho string) ([]CalculadoraValor, error) {
    linhas, err := lerLinhas(caminho) // função auxiliar tua
    if err != nil {
        return nil, err
    }

    var passagens []CalculadoraValor
    for _, l := range linhas {
        if l.Tipo == "internacional" {
            passagens = append(passagens, PassagemInternacional{})
        } else {
            passagens = append(passagens, PassagemDomestica{})
        }
    }
    return passagens, nil
}
~~~

O slice é de CalculadoraValor, a interface, não de um tipo concreto. É isto que te permite guardar PassagemInternacional e PassagemDomestica lado a lado no mesmo slice: para quem o lê, ambos são só algo que sabe calcular ValorFinal().`,

        5: `~~~
func ContarPorTipo(passagens []CalculadoraValor) (internacionais, domesticas int) {
    for _, p := range passagens {
        switch p.(type) {
        case PassagemInternacional:
            internacionais++
        case PassagemDomestica:
            domesticas++
        }
    }
    return
}
~~~`,

        6: `~~~
func ValorTotalPago(passagens []CalculadoraValor) float64 {
    total := 0.0
    for _, p := range passagens {
        total += p.ValorFinal()
    }
    return total
}
~~~

Esta função nunca precisa de saber se p é internacional ou doméstica: chama ValorFinal() e confia que cada tipo sabe calcular o seu próprio valor. É o próprio motivo de existir a interface.`,

        7: `~~~
func PassagensDoMes(passagens []CalculadoraValor, mes int) []CalculadoraValor {
    var resultado []CalculadoraValor
    for _, p := range passagens {
        var data string
        switch v := p.(type) {
        case PassagemInternacional:
            data = v.DataPartida
        case PassagemDomestica:
            data = v.DataPartida
        }
        if extrairMes(data) == mes {
            resultado = append(resultado, p)
        }
    }
    return resultado
}
~~~

Como DataPartida vem do struct Passagem embutido, acedes-lhe através de v depois do type switch. extrairMes seria uma função auxiliar tua para fazeres o parsing da data.`,

        8: `~~~
func SituacaoEmpresa(valorTotal, orcamento float64) (lucro bool, valor float64) {
    diferenca := valorTotal - orcamento
    return diferenca > 0, diferenca
}
~~~`,

        9: `O menu não precisa de nada novo além do que já viste no Bloco 0 e no Bloco 2: um for infinito com um switch a ler a opção escolhida, chamando as funções que já construíste nos exercícios anteriores deste domínio.`,

        10: `~~~
GET    /passagens
GET    /passagens/tipo/{tipo}
GET    /passagens/total
DELETE /passagens/{codigoVoo}
~~~

Os mesmos padrões de handler que praticaste nos Blocos 8, 9 e 10, agora sobre este domínio em vez de tarefas.`,

        11: `~~~
dados, _ := json.MarshalIndent(passagens, "", "  ")
os.WriteFile("relatorio.json", dados, 0644)
~~~

O mesmo padrão do Bloco 7, aplicado ao slice de passagens em vez de tarefas.`,
      },
      livro: `Este domínio pega no mesmo problema que, em Java, se resolveria com herança e classes abstratas, uma hierarquia Passagem → Internacional → Doméstica, e resolve-o com as ferramentas que já tens: um struct base embutido, e uma interface para a única coisa que realmente varia entre os tipos, o cálculo do valor final.

## Porque não precisas de herança

Em Java, PassagemInternacional herdaria de Passagem, e sobrescreveria um method para calcular o valor. Em Go, não há herança de tipos, e a solução idiomática é composição: PassagemInternacional embute Passagem, ganha os seus campos por promoção, exatamente como ClienteVIP embutia Cliente no Bloco 1, e implementa o seu próprio ValorFinal().

~~~
type PassagemInternacional struct {
    Passagem
    TemVisto      bool
    Directo       bool
    RefeicaoExtra bool
    HorasTransito int
}

func (p PassagemInternacional) ValorFinal() float64 {
    // as regras específicas deste tipo
}
~~~

## A interface como o único ponto de variação

~~~
type CalculadoraValor interface {
    ValorFinal() float64
}
~~~

Esta interface tem um único method, o suficiente para capturar a única coisa que precisa de variar: como se calcula o preço final. Tudo o resto, os campos partilhados, a forma como se lê um ficheiro, como se soma um total, é código comum que não precisa de saber qual dos dois tipos concretos está a tratar.

## Polimorfismo: o mesmo slice, dois tipos diferentes

~~~
var passagens []CalculadoraValor
passagens = append(passagens, PassagemInternacional{})
passagens = append(passagens, PassagemDomestica{})

total := 0.0
for _, p := range passagens {
    total += p.ValorFinal()
}
~~~

Este é o momento central do domínio: o mesmo slice guarda os dois tipos concretos lado a lado, porque ambos satisfazem CalculadoraValor. A função que soma o total nunca precisa de saber qual é qual, chama ValorFinal() e confia que cada tipo sabe responder por si. É exatamente o mesmo princípio que ConcluirTudo aplicava a Concluivel no Bloco 4, agora aplicado a um domínio de negócio a sério.

Quando precisas mesmo de distinguir os tipos, para contar quantos são de cada, usas type assertion ou type switch, as mesmas ferramentas do Bloco 4, nunca o contrário: a regra é desenhar para o comportamento comum primeiro, e só recorrer ao tipo concreto quando for genuinamente necessário.`,
    },
    {
      id: "d2",
      titulo: "Domínio 2 — Movitel: Pedidos de Requisição de Celulares",
      faixa: "8 exercícios",
      descricao: "Sistema de pedidos de requisição de telemóveis, com a mesma lógica de composição do Domínio 1: um struct base Pedido e três variações que calculam o valor a pagar de forma diferente.",
      recursos: [],
      encaixaDepoisDe: "b4",
      reaproveitaEm: ["b10"],
      exercicios: [
        "Cria o struct base Pedido, com os campos Codigo int, NomeCliente string, Marca string e Valor float64.",
        "Cria a interface CalculadoraPedido, com o método ValorAPagar() float64.",
        "Cria o struct PedidoCorporativo, que embute Pedido e adiciona o campo Quantidade int. O valor final varia consoante a quantidade de telemóveis pedidos.",
        "Cria o struct PedidoIndividual, que embute Pedido e adiciona o campo TipoCompra string. Aplica um desconto de 5% quando TipoCompra é igual a \"Novo\".",
        "Cria o struct PedidoColaborador, que embute Pedido e adiciona o campo NumDeducoes int. O valor a pagar é o valor de cada dedução individual.",
        "Todos os tipos de pedido aplicam ainda 16% de IVA. Decide se essa regra fica na própria interface ou numa função auxiliar partilhada entre os três tipos.",
        "Cria um map[int]CalculadoraPedido que regista os pedidos por código, e implementa uma função BuscarPorID para os encontrar.",
        "Constrói a versão em linha de comandos ou em API: registar um pedido, listar os pedidos numa tabela, calcular o valor total com IVA incluído e cancelar um pedido pelo código.",
      ],
      dicas: {
        0: `~~~
type Pedido struct {
    Codigo      int
    NomeCliente string
    Marca       string
    Valor       float64
}
~~~`,

        1: `~~~
type CalculadoraPedido interface {
    ValorAPagar() float64
}
~~~`,

        2: `~~~
type PedidoCorporativo struct {
    Pedido
    Quantidade int
}

func (p PedidoCorporativo) ValorAPagar() float64 {
    return p.Valor * float64(p.Quantidade)
}
~~~`,

        3: `~~~
type PedidoIndividual struct {
    Pedido
    TipoCompra string
}

func (p PedidoIndividual) ValorAPagar() float64 {
    if p.TipoCompra == "Novo" {
        return p.Valor * 0.95
    }
    return p.Valor
}
~~~`,

        4: `~~~
type PedidoColaborador struct {
    Pedido
    NumDeducoes int
}

func (p PedidoColaborador) ValorAPagar() float64 {
    return p.Valor / float64(p.NumDeducoes)
}
~~~`,

        5: `~~~
func comIVA(valor float64) float64 {
    return valor * 1.16
}

func (p PedidoCorporativo) ValorAPagar() float64 {
    return comIVA(p.Valor * float64(p.Quantidade))
}
~~~

Uma função auxiliar partilhada evita repetires * 1.16 em cada um dos três métodos, e centraliza a regra num único sítio caso a taxa alguma vez mude.`,

        6: `~~~
pedidos := make(map[int]CalculadoraPedido)
pedidos[1] = PedidoCorporativo{Pedido: Pedido{Codigo: 1}, Quantidade: 10}

func BuscarPorID(codigo int, m map[int]CalculadoraPedido) (CalculadoraPedido, bool) {
    p, ok := m[codigo]
    return p, ok
}
~~~

O mesmo padrão (valor, ok) que já usaste no Bloco 2, agora sobre um map cujo valor é uma interface em vez de um struct concreto.`,

        7: `Reaproveita a estrutura de handlers ou de menu que já construíste no Domínio 1: os mesmos padrões de listar, calcular total e cancelar por código aplicam-se aqui, só a mudar o domínio de passagens para pedidos.`,
      },
      livro: `O domínio da Movitel repete a estrutura do Domínio 1, com um propósito diferente: confirmar que interiorizaste o padrão, e não que decoraste a solução do primeiro exemplo. Um struct base, Pedido, e três variações que calculam ValorAPagar() de forma diferente cada uma.

## O mesmo padrão, um domínio diferente

~~~
type CalculadoraPedido interface {
    ValorAPagar() float64
}

type PedidoCorporativo struct {
    Pedido
    Quantidade int
}

type PedidoIndividual struct {
    Pedido
    TipoCompra string
}

type PedidoColaborador struct {
    Pedido
    NumDeducoes int
}
~~~

Cada um destes três tipos embute Pedido, e implementa ValorAPagar() com uma regra própria: o corporativo multiplica pela quantidade, o individual aplica um desconto condicional, o colaborador divide pelo número de deduções. Nenhum dos três precisa de saber que os outros dois existem.

## Uma decisão de desenho real: onde vive a regra do IVA

Os três tipos aplicam a mesma taxa de IVA por cima do valor específico de cada um. Isto levanta uma pergunta de desenho genuína: essa regra fica dentro de cada method ValorAPagar(), repetida três vezes, ou numa função auxiliar partilhada?

~~~
func comIVA(valor float64) float64 {
    return valor * 1.16
}
~~~

Não há uma resposta certa universal, mas há um critério útil: se a regra do IVA alguma vez mudar, uma função partilhada muda-a num único sítio; três cópias da mesma multiplicação exigem lembrares-te de alterar as três. Repetição pequena e óbvia, como esta, é normalmente um sinal de que vale a pena extrair uma função auxiliar, mesmo que cada cópia individual pareça trivial demais para justificar a abstração.

## BuscarPorID sobre uma interface

~~~
pedidos := make(map[int]CalculadoraPedido)

func BuscarPorID(codigo int, m map[int]CalculadoraPedido) (CalculadoraPedido, bool) {
    p, ok := m[codigo]
    return p, ok
}
~~~

O map guarda a interface, não um tipo concreto, o que significa que o mesmo map aceita pedidos corporativos, individuais e de colaborador, todos misturados, tal como o slice de passagens no Domínio 1. Este é o mesmo padrão (valor, ok) do Bloco 2, agora sobre uma coleção de valores polimórficos em vez de um tipo único.`,
    },
    {
      id: "d3",
      titulo: "Domínio 3 — Tekken 8: Participantes de Campeonato",
      faixa: "6 exercícios",
      descricao: "Domínio mais simples, sem hierarquia entre structs, ideal para praticares slices e leitura de ficheiros de forma isolada.",
      recursos: [],
      encaixaDepoisDe: "b2",
      reaproveitaEm: ["b3"],
      exercicios: [
        "Cria o struct Participante, com os campos Nome string, Rounds int, TempoMedio float64 e Resultado string, que pode ser \"ganhou\" ou \"perdeu\".",
        "Implementa LerParticipantes(caminho string) ([]Participante, error), que lê os participantes a partir de um ficheiro.",
        "Implementa ContarResultados(participantes []Participante) (ganharam, perderam int).",
        "Implementa MenorTempoEntreVencedores(participantes []Participante) (Participante, error), que devolve um erro quando não existir nenhum vencedor.",
        "Implementa ValorTotalPremios(participantes []Participante) float64, atribuindo 1000Mts a quem ganhou em 2 ou 3 rounds.",
        "Como bónus, gera uma matriz [][]float64 de 5 linhas por 10 colunas com valores aleatórios de math/rand, extrai a 3ª e a 5ª linha como slices próprios, e calcula o produto total de todos os elementos.",
      ],
      dicas: {
        0: `~~~
type Participante struct {
    Nome       string
    Rounds     int
    TempoMedio float64
    Resultado  string
}
~~~`,

        1: `~~~
func LerParticipantes(caminho string) ([]Participante, error) {
    dados, err := os.ReadFile(caminho)
    if err != nil {
        return nil, err
    }
    // faz o parsing de dados linha a linha para []Participante
    return participantes, nil
}
~~~

O mesmo padrão de leitura de ficheiro que praticaste no Bloco 0 e no Bloco 7, agora a construir a tua própria função de parsing linha a linha, com strings.Split ou strings.Fields.`,

        2: `~~~
func ContarResultados(participantes []Participante) (ganharam, perderam int) {
    for _, p := range participantes {
        if p.Resultado == "ganhou" {
            ganharam++
        } else {
            perderam++
        }
    }
    return
}
~~~

Como ganharam e perderam já estão nomeados na assinatura da função, um return sozinho no fim devolve o que estiver guardado neles nesse momento, tal como praticaste no Bloco 0.`,

        3: `~~~
func MenorTempoEntreVencedores(participantes []Participante) (Participante, error) {
    var melhor Participante
    encontrado := false

    for _, p := range participantes {
        if p.Resultado != "ganhou" {
            continue
        }
        if !encontrado || p.TempoMedio < melhor.TempoMedio {
            melhor = p
            encontrado = true
        }
    }

    if !encontrado {
        return Participante{}, errors.New("nenhum vencedor encontrado")
    }
    return melhor, nil
}
~~~

A flag encontrado resolve o problema de qual valor inicial dar a melhor: sem ela, comparavas sempre contra o valor zero de TempoMedio, que é 0, e nunca haveria vencedor com tempo menor do que isso.`,

        4: `~~~
func ValorTotalPremios(participantes []Participante) float64 {
    total := 0.0
    for _, p := range participantes {
        if p.Resultado == "ganhou" && (p.Rounds == 2 || p.Rounds == 3) {
            total += 1000
        }
    }
    return total
}
~~~`,

        5: `~~~
var matriz [5][10]float64
for i := range matriz {
    for j := range matriz[i] {
        matriz[i][j] = rand.Float64() * 100
    }
}

linha3 := matriz[2][:]
linha5 := matriz[4][:]
~~~

matriz[2][:] transforma a linha de índice 2 do array, ou seja, a 3ª linha, num slice próprio, que passas a poder tratar como qualquer outro slice.`,
      },
      livro: `Este domínio é deliberadamente mais simples que os outros três: sem hierarquia de tipos, sem interface nenhuma. O objetivo é isolares a prática de slices e leitura de ficheiros do peso extra de desenhar uma hierarquia ao mesmo tempo.

## Um único tipo, sem composição

~~~
type Participante struct {
    Nome       string
    Rounds     int
    TempoMedio float64
    Resultado  string
}
~~~

Não há aqui nada equivalente a PassagemInternacional ou PedidoCorporativo. Todas as funções deste domínio operam sobre []Participante diretamente, o que te deixa focares nos próprios algoritmos: contar, filtrar, encontrar um mínimo, sem a camada extra de decidir que tipo concreto cada elemento é.

## Encontrar um mínimo com uma flag de estado

~~~
func MenorTempoEntreVencedores(participantes []Participante) (Participante, error) {
    var melhor Participante
    encontrado := false

    for _, p := range participantes {
        if p.Resultado != "ganhou" {
            continue
        }
        if !encontrado || p.TempoMedio < melhor.TempoMedio {
            melhor = p
            encontrado = true
        }
    }

    if !encontrado {
        return Participante{}, errors.New("nenhum vencedor encontrado")
    }
    return melhor, nil
}
~~~

Este padrão, uma flag booleana a acompanhar a procura de um mínimo ou máximo, resolve um problema real: sem ela, terias de comparar contra algum valor inicial, e não há um TempoMedio inicial que sirva sempre, zero seria um vencedor artificial melhor que qualquer tempo real. A flag torna explícito "ainda não vi nenhum candidato válido", em vez de fingires um candidato que não existe.

## O bónus: fatiar um array multidimensional

~~~
var matriz [5][10]float64
linha3 := matriz[2][:]
~~~

matriz[2][:] transforma a linha de índice 2 do array, a terceira linha, num slice próprio. Isto liga-se diretamente ao que aprendeste no Bloco 2 sobre slices serem uma vista sobre um array: aqui, a vista é sobre uma única linha de um array bidimensional, e continua a partilhar a memória desse array, não uma cópia.

Este domínio encaixa a seguir ao Bloco 2, e antecede o Bloco 3: o exercício de erro, "nenhum vencedor encontrado", é a tua primeira oportunidade de aplicar o padrão de retorno com error fora do contexto controlado dos exercícios do próprio Bloco 3.`,
    },
    {
      id: "d4",
      titulo: "Domínio 4 — EDM/FIPAG: Faturação + Atlético de Moçambique",
      faixa: "8 exercícios",
      descricao: "Dois problemas independentes no mesmo domínio: faturação de energia e água, e classificação de um campeonato de futebol. Bom para praticares sem misturares as duas lógicas.",
      recursos: [],
      encaixaDepoisDe: "b2",
      reaproveitaEm: ["b6"],
      exercicios: [
        "Cria o struct Cliente, com os campos Nome string, KiloJoules int, Litros int e Tipo string, que pode ser \"E\" de empresa ou \"P\" de particular.",
        "Implementa ValorAPagar(c Cliente) float64: a EDM cobra 2Mt por KiloJoule e a FIPAG cobra 3Mt por Litro, com desconto de 10% quando o consumo passa de 100, e 16% de IVA aplicado depois do desconto.",
        "Implementa ContarPorTipo(clientes []Cliente) (empresas, particulares int).",
        "Implementa ValorTotalPorFornecedor(clientes []Cliente) (totalEDM, totalFIPAG float64).",
        "Implementa FornecedorQueMaisFaturou(totalEDM, totalFIPAG float64) string.",
        "Problema independente sobre o Atlético de Moçambique: cria os slices golosMarcados, golosSofridos e diferenca, todos []int, para 10 jogos.",
        "Implementa CalcularPontuacao(diferenca []int) int: uma diferença negativa vale 0 pontos, zero vale 1 ponto, e uma diferença positiva vale 3 pontos.",
        "Implementa o teu próprio BubbleSort, escrito manualmente sobre diferenca, sem usares sort.Slice. É treino de lógica antes de dependeres da standard library.",
      ],
      dicas: {
        0: `~~~
type Cliente struct {
    Nome       string
    KiloJoules int
    Litros     int
    Tipo       string
}
~~~`,

        1: `~~~
func ValorAPagar(c Cliente) float64 {
    valor := float64(c.KiloJoules)*2 + float64(c.Litros)*3
    consumo := c.KiloJoules + c.Litros

    if consumo > 100 {
        valor *= 0.9
    }

    return valor * 1.16
}
~~~

O desconto e o IVA aplicam-se em sequência sobre o mesmo valor: primeiro o desconto, se aplicável, e só depois o IVA sobre o que sobrou.`,

        2: `~~~
func ContarPorTipo(clientes []Cliente) (empresas, particulares int) {
    for _, c := range clientes {
        if c.Tipo == "E" {
            empresas++
        } else {
            particulares++
        }
    }
    return
}
~~~`,

        3: `~~~
func ValorTotalPorFornecedor(clientes []Cliente) (totalEDM, totalFIPAG float64) {
    for _, c := range clientes {
        totalEDM += float64(c.KiloJoules) * 2
        totalFIPAG += float64(c.Litros) * 3
    }
    return
}
~~~`,

        4: `~~~
func FornecedorQueMaisFaturou(totalEDM, totalFIPAG float64) string {
    if totalEDM > totalFIPAG {
        return "EDM"
    }
    return "FIPAG"
}
~~~`,

        5: `~~~
golosMarcados := make([]int, 10)
golosSofridos := make([]int, 10)
diferenca := make([]int, 10)

for i := range diferenca {
    diferenca[i] = golosMarcados[i] - golosSofridos[i]
}
~~~

Preenche primeiro golosMarcados e golosSofridos, à mão ou com valores aleatórios, antes de calculares a diferença jogo a jogo.`,

        6: `~~~
func CalcularPontuacao(diferenca []int) int {
    pontos := 0
    for _, d := range diferenca {
        switch {
        case d < 0:
            pontos += 0
        case d == 0:
            pontos += 1
        default:
            pontos += 3
        }
    }
    return pontos
}
~~~`,

        7: `~~~
func BubbleSort(diferenca []int) {
    n := len(diferenca)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-1-i; j++ {
            if diferenca[j] > diferenca[j+1] {
                diferenca[j], diferenca[j+1] = diferenca[j+1], diferenca[j]
            }
        }
    }
}
~~~

Cada passagem pelo slice compara vizinhos e troca-os se estiverem na ordem errada, empurrando gradualmente o maior valor para o fim. n-1-i reduz o alcance a cada passagem, porque os últimos i elementos já ficaram ordenados nas voltas anteriores.`,
      },
      livro: `Dois problemas independentes debaixo do mesmo domínio: faturação de energia e água, e classificação de um campeonato de futebol. Nenhum se apoia no outro, o valor de praticares os dois lado a lado é treinares não misturares lógicas diferentes no mesmo código.

## Faturação: regras aplicadas em sequência

~~~
func ValorAPagar(c Cliente) float64 {
    valor := float64(c.KiloJoules)*2 + float64(c.Litros)*3
    consumo := c.KiloJoules + c.Litros

    if consumo > 100 {
        valor *= 0.9
    }

    return valor * 1.16
}
~~~

A ordem importa aqui: primeiro calculas o valor base a partir do consumo, depois aplicas o desconto por volume se for o caso, e só no fim acrescentas o IVA, sobre o que sobrou depois do desconto, não sobre o valor base original. Inverter a ordem destas operações mudaria o resultado final, mesmo que cada regra individual estivesse correta.

## BubbleSort: o algoritmo antes da biblioteca

O enunciado original pede para implementares BubbleSort à mão, sem sort.Slice, que já usaste no Bloco 2.

~~~
func BubbleSort(diferenca []int) {
    n := len(diferenca)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-1-i; j++ {
            if diferenca[j] > diferenca[j+1] {
                diferenca[j], diferenca[j+1] = diferenca[j+1], diferenca[j]
            }
        }
    }
}
~~~

Cada passagem pelo slice compara vizinhos e troca-os se estiverem na ordem errada, o que empurra gradualmente o maior valor não ordenado para o fim. n-1-i reduz o alcance da comparação a cada passagem, porque os últimos i elementos já ficaram corretamente ordenados nas voltas anteriores, e não há razão para os voltares a comparar.

Não é o algoritmo de ordenação mais eficiente, é O(n²), e é exatamente por isso que sort.Slice existe e deves usá-lo em código real. O valor de o escreveres à mão uma vez é perceberes o que uma função de biblioteca está de facto a fazer por ti, antes de dependeres dela sem pensar.

## Duas variáveis nomeadas, um único return

~~~
func ContarPorTipo(clientes []Cliente) (empresas, particulares int) {
    for _, c := range clientes {
        if c.Tipo == "E" {
            empresas++
        } else {
            particulares++
        }
    }
    return
}
~~~

O mesmo padrão de named return values que viste pela primeira vez no Bloco 0, aqui aplicado a um caso real: contar por categoria é exatamente o tipo de função pequena onde nomear os retornos torna a assinatura mais legível do que (int, int) sozinho deixaria.

Este é o último domínio prático do Nível 1. Os quatro, juntos, foram a tua prática de composição e polimorfismo em situações que se pareciam com problemas reais, não só com exercícios isolados; o Nível 2 vai pedir-te o mesmo tipo de desenho, mas agora com bases de dados, filas de mensagens e HTTP a sério a complicar cada decisão.`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Nível 2 — Pleno
// ---------------------------------------------------------------------------

const TRILHA_N2_CONCEITOS = {
  id: "n2conceitos",
  titulo: "Fundamentos de backend",
  intro: "6 blocos de treino isolado sobre o que separa uma API de exercício de um serviço a sério: contextos, concorrência, base de dados, arquitetura, testes e containers.",
  blocos: [
    {
      id: "b13",
      titulo: "Bloco 13 — context.Context",
      faixa: "Ex 13.1–13.8",
      descricao: "O context.Context é a forma padrão de transportar prazos, cancelamento e dados de âmbito de pedido através das camadas de uma aplicação Go. Aparece na assinatura de quase todas as funções de um serviço real.",
      recursos: [
        { label: "Go — pacote context", url: "https://pkg.go.dev/context" },
        { label: "Go Blog — Go Concurrency Patterns: Context", url: "https://go.dev/blog/context" },
        { label: "Go by Example — Context", url: "https://gobyexample.com/context" },
      ],
      exercicios: [
        "Cria uma função que recebe context.Context como primeiro parâmetro e devolve um erro quando o contexto for cancelado, usando ctx.Done() e ctx.Err().",
        "Usa context.WithTimeout para limitares uma operação lenta a 2 segundos, e confirma que ela é interrompida quando ultrapassa esse tempo.",
        "Usa context.WithCancel para cancelares manualmente uma operação a partir de outra parte do programa, chamando sempre cancel() com defer para libertar recursos.",
        "Passa um context.Context através de várias camadas de funções, do handler HTTP até à função que faz a consulta, e observa como o cancelamento se propaga em cadeia.",
        "Lê o contexto de um pedido HTTP com r.Context(), e cancela o trabalho no servidor quando o cliente desliga antes de receber a resposta.",
        "Usa context.WithValue para transportares um identificador de pedido através das camadas, e explica por escrito porque este mecanismo só deve servir para dados de âmbito de pedido, nunca para parâmetros obrigatórios.",
        "Cria um tipo próprio para usares como chave em context.WithValue, em vez de uma string, e explica por escrito porque isso evita colisões entre pacotes diferentes.",
        "Aplica context.Context a uma consulta de base de dados com QueryContext ou ExecContext, e confirma que a consulta é abortada quando o contexto expira.",
      ],
    },
    {
      id: "b14",
      titulo: "Bloco 14 — Concorrência: goroutines, channels e sync",
      faixa: "Ex 14.1–14.12",
      descricao: "Concorrência é o argumento mais forte de Go. Goroutines são baratas, channels comunicam entre elas, e o pacote sync protege o que é partilhado. Este bloco cobre os padrões que aparecem em serviços reais.",
      recursos: [
        { label: "Tour of Go — Concurrency", url: "https://go.dev/tour/concurrency/1" },
        { label: "Go by Example — Goroutines", url: "https://gobyexample.com/goroutines" },
        { label: "Go by Example — Channels", url: "https://gobyexample.com/channels" },
        { label: "Go by Example — WaitGroups", url: "https://gobyexample.com/waitgroups" },
        { label: "Go by Example — Mutexes", url: "https://gobyexample.com/mutexes" },
        { label: "Go Blog — Race Detector", url: "https://go.dev/blog/race-detector" },
      ],
      exercicios: [
        "Lança uma goroutine com a palavra-chave go, e usa sync.WaitGroup para esperares que ela termine antes de o programa acabar.",
        "Cria um channel sem buffer, envia um valor a partir de uma goroutine e recebe-o na função principal.",
        "Compara um channel sem buffer com um channel com buffer de tamanho 3, e observa em que momento cada envio bloqueia.",
        "Usa select para leres de dois channels em simultâneo, e trata com um case default o caso em que nenhum tem dados prontos.",
        "Combina select com context.Context para interromperes um worker quando o contexto for cancelado.",
        "Fecha um channel com close() e percorre-o com range, confirmando que o loop termina sozinho quando o channel fecha.",
        "Usa a forma v, ok := <-ch na receção para distinguires um channel fechado de um valor zero legítimo.",
        "Implementa um worker pool com 3 goroutines que consomem tarefas de um channel de entrada e escrevem resultados num channel de saída.",
        "Protege um contador partilhado entre goroutines com sync.Mutex, correndo primeiro a versão sem proteção para veres o problema acontecer.",
        "Corre os testes com a flag -race para detetares data races, e corrige tudo o que o detetor apontar.",
        "Usa sync.RWMutex numa estrutura com muitas leituras e poucas escritas, e explica por escrito em que situações isso compensa face a um Mutex simples.",
        "Usa errgroup.Group para lançares várias goroutines que podem falhar, recolhendo o primeiro erro que ocorrer e cancelando as restantes.",
      ],
    },
    {
      id: "b15",
      titulo: "Bloco 15 — Persistência: SQL, migrations e transações",
      faixa: "Ex 15.1–15.10",
      descricao: "Trocar o map em memória por uma base de dados real traz problemas novos: esquema que evolui, ligações que se esgotam, e operações que têm de acontecer todas ou nenhuma.",
      recursos: [
        { label: "Go — pacote database/sql", url: "https://pkg.go.dev/database/sql" },
        { label: "Go — Tutorial: acessar base de dados SQL", url: "https://go.dev/doc/tutorial/database-access" },
        { label: "pgx — driver PostgreSQL para Go", url: "https://github.com/jackc/pgx" },
        { label: "golang-migrate", url: "https://github.com/golang-migrate/migrate" },
        { label: "PostgreSQL — imagem oficial Docker", url: "https://hub.docker.com/_/postgres" },
      ],
      exercicios: [
        "Sobe uma base de dados PostgreSQL local com Docker, e confirma que consegues ligar-te a ela com o psql ou com um cliente gráfico.",
        "Liga a aplicação à base de dados com database/sql e o driver pgx, e confirma a ligação com db.PingContext.",
        "Configura o pool de ligações com SetMaxOpenConns, SetMaxIdleConns e SetConnMaxLifetime, e explica por escrito porque deixar estes valores por omissão é arriscado em produção.",
        "Instala o golang-migrate e cria a tua primeira migration, com os ficheiros de subida e de reversão.",
        "Aplica e reverte migrations, confirmando que a reversão devolve o esquema exatamente ao estado anterior.",
        "Escreve uma consulta com parâmetros no formato $1, $2, em vez de concatenares strings, e explica por escrito como isso previne SQL injection.",
        "Lê várias linhas com QueryContext, percorre o resultado com rows.Next(), verifica rows.Err() no fim, e fecha as rows com defer.",
        "Distingue sql.ErrNoRows de um erro real na procura por identificador, devolvendo um erro de domínio próprio quando o registo simplesmente não existe.",
        "Abre uma transação com BeginTx, executa duas operações e confirma com Commit, garantindo o Rollback com defer para o caso de algo falhar.",
        "Provoca de propósito uma falha a meio de uma transação, e confirma que nenhuma das operações ficou gravada.",
      ],
    },
    {
      id: "b16",
      titulo: "Bloco 16 — Arquitetura em camadas e injeção de dependências",
      faixa: "Ex 16.1–16.7",
      descricao: "Separar handler, serviço e repositório só compensa quando as dependências apontam todas para o domínio. Este bloco treina o sentido dessas setas, que é o que torna o código testável e substituível.",
      recursos: [
        { label: "Effective Go — Interfaces", url: "https://go.dev/doc/effective_go#interfaces" },
        { label: "Go Code Review Comments — Interfaces", url: "https://go.dev/wiki/CodeReviewComments#interfaces" },
        { label: "Standard Go Project Layout", url: "https://github.com/golang-standards/project-layout" },
      ],
      exercicios: [
        "Define a interface do repositório na camada de domínio, e não no pacote que a implementa, para que o domínio não dependa da infraestrutura.",
        "Implementa duas versões do mesmo repositório, uma em memória e outra com PostgreSQL, ambas a satisfazer a mesma interface.",
        "Injeta o repositório no serviço através do construtor, recebendo sempre a interface e nunca o tipo concreto.",
        "Injeta o serviço no handler HTTP da mesma forma, e confirma que o handler não tem maneira de saber qual implementação está a ser usada.",
        "Monta todas as dependências num único sítio, na função main, e explica por escrito porque concentrar a montagem facilita testar e trocar peças.",
        "Troca a implementação do repositório de memória para PostgreSQL mudando apenas uma linha no main, sem tocares no serviço nem no handler.",
        "Desenha num diagrama, ou em comentário, o sentido das dependências entre as camadas, e confirma que todas apontam para o domínio.",
      ],
    },
    {
      id: "b17",
      titulo: "Bloco 17 — Testes: mocks, integração e cobertura",
      faixa: "Ex 17.1–17.9",
      descricao: "Com camadas bem separadas, a maior parte da lógica testa-se sem servidor nem base de dados. O resto precisa de testes de integração, que são mais lentos e por isso devem correr separados.",
      recursos: [
        { label: "Go — pacote testing", url: "https://pkg.go.dev/testing" },
        { label: "mockery", url: "https://github.com/vektra/mockery" },
        { label: "gomock (uber-go/mock)", url: "https://github.com/uber-go/mock" },
        { label: "testcontainers-go", url: "https://golang.testcontainers.org/" },
        { label: "Go Blog — Cover", url: "https://go.dev/blog/cover" },
      ],
      exercicios: [
        "Escreve um teste de unidade do serviço usando a implementação em memória do repositório, sem base de dados nenhuma envolvida.",
        "Instala o mockery ou o gomock, e gera um mock a partir da interface do repositório.",
        "Escreve um teste que configura o mock para devolver um erro, e confirma que o serviço lida corretamente com essa falha.",
        "Verifica com o mock que um método foi chamado o número de vezes esperado e com os argumentos certos.",
        "Escreve um teste de integração que corre contra uma base de dados real, e separa-o dos testes rápidos com a flag -short e a função testing.Short().",
        "Usa testcontainers-go, ou um docker-compose dedicado a testes, para levantares a base de dados automaticamente durante os testes de integração.",
        "Limpa o estado da base de dados entre testes, seja revertendo uma transação no fim de cada um, seja truncando as tabelas.",
        "Mede a cobertura com go test -cover, e gera o relatório visual com go tool cover -html.",
        "Encontra no relatório de cobertura um caminho de erro que ainda não está testado, e escreve o teste que falta.",
      ],
    },
    {
      id: "b18",
      titulo: "Bloco 18 — Docker e docker-compose",
      faixa: "Ex 18.1–18.6",
      descricao: "Containerizar deixa de ser opcional a partir do momento em que a aplicação depende de base de dados, cache ou filas. É também o que torna o ambiente local reproduzível para qualquer pessoa.",
      recursos: [
        { label: "Docker — instalação", url: "https://docs.docker.com/engine/install/" },
        { label: "Docker — guia de containerização Go", url: "https://docs.docker.com/language/golang/" },
        { label: "Docker Compose — documentação", url: "https://docs.docker.com/compose/" },
        { label: "Distroless — imagens base mínimas", url: "https://github.com/GoogleContainerTools/distroless" },
      ],
      exercicios: [
        "Instala o Docker Engine e o docker compose, e confirma a instalação com docker version e docker compose version.",
        "Escreve um Dockerfile para a aplicação Go usando multi-stage build: compila numa imagem com o compilador, e copia apenas o binário para a imagem final.",
        "Reduz o tamanho da imagem final usando uma base mínima como alpine ou distroless, e compara o tamanho antes e depois.",
        "Escreve um ficheiro .dockerignore para não enviares para o build coisas desnecessárias, como a pasta .git e binários locais.",
        "Escreve um docker-compose.yml que sobe a aplicação e a base de dados em conjunto, ligadas pela mesma rede.",
        "Passa a configuração para o contentor através de variáveis de ambiente, em vez de a deixares fixa no código.",
      ],
    },
  ],
};

const TRILHA_N2_PROJETOS = {
  id: "n2projetos",
  titulo: "Projetos de nível pleno",
  intro: "6 projetos que juntam os blocos anteriores em sistemas completos. Cada exercício é uma etapa de trabalho, não uma linha de código, e o conjunto de cada projeto vale por si como peça de portefólio.",
  blocos: [
    {
      id: "d5",
      titulo: "Projeto 1 — API com Clean Architecture",
      faixa: "12 exercícios",
      descricao: "Uma API onde o domínio não conhece HTTP nem SQL, os casos de uso são explícitos, e a infraestrutura é substituível. É a base sobre a qual assentam os projetos seguintes.",
      recursos: [
        { label: "Clean Architecture — artigo original", url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html" },
        { label: "Standard Go Project Layout", url: "https://github.com/golang-standards/project-layout" },
      ],
      encaixaDepoisDe: "b16",
      exercicios: [
        "Cria a estrutura de pastas separando as três camadas: o domínio com entidades e regras, os casos de uso com a lógica de aplicação, e a infraestrutura com base de dados e HTTP.",
        "Define as entidades do domínio como structs simples, sem tags de JSON nem de base de dados, para que não fiquem presas a nenhuma tecnologia.",
        "Escreve as regras de validação dentro do domínio, como métodos das próprias entidades.",
        "Define dentro da camada de domínio as interfaces de que ele precisa, como repositórios, relógio e gerador de identificadores.",
        "Implementa cada caso de uso como um tipo próprio com um único método de execução, que recebe context.Context e um struct de entrada.",
        "Devolve erros de domínio próprios a partir dos casos de uso, sem qualquer referência a HTTP ou a SQL.",
        "Implementa o repositório na camada de infraestrutura, traduzindo entre as linhas da base de dados e as entidades do domínio.",
        "Cria os DTOs de entrada e de saída da API na camada HTTP, separados das entidades do domínio, e escreve a conversão entre uns e outros.",
        "Traduz os erros de domínio para códigos de estado HTTP num único sítio, através de um tratamento de erros partilhado.",
        "Monta a aplicação toda na função main, ligando repositórios, casos de uso e handlers.",
        "Escreve testes dos casos de uso sem levantares servidor nem base de dados, usando implementações falsas das interfaces.",
        "Escreve o Dockerfile e o docker-compose desta API, aplicando o que praticaste no Bloco 18.",
      ],
    },
    {
      id: "d6",
      titulo: "Projeto 2 — Autenticação e autorização",
      faixa: "11 exercícios",
      descricao: "Registo, login, sessões e permissões. É a área onde os erros custam mais caro, por isso cada etapa aqui tem uma razão de segurança por trás.",
      recursos: [
        { label: "golang-jwt", url: "https://github.com/golang-jwt/jwt" },
        { label: "Go — pacote bcrypt", url: "https://pkg.go.dev/golang.org/x/crypto/bcrypt" },
        { label: "OWASP — Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" },
        { label: "OAuth 2.0 — visão geral", url: "https://oauth.net/2/" },
      ],
      encaixaDepoisDe: "d5",
      exercicios: [
        "Cria a entidade de utilizador e guarda a palavra-passe com bcrypt, nunca em texto simples.",
        "Implementa o registo de utilizador, validando o formato do email e a força mínima da palavra-passe.",
        "Implementa o login comparando a palavra-passe recebida com o hash guardado, e devolve sempre a mesma mensagem genérica quando as credenciais falham, para não revelares se o email existe.",
        "Gera um token JWT assinado, com as claims de identificação do utilizador e um prazo de validade curto.",
        "Escreve um middleware que lê o token do cabeçalho Authorization, valida a assinatura e o prazo, e rejeita o pedido quando alguma dessas verificações falha.",
        "Coloca o utilizador autenticado no context do pedido, e lê-o a partir dos handlers seguintes.",
        "Implementa refresh tokens, com validade mais longa e guardados do lado do servidor, para que seja possível revogar sessões.",
        "Implementa a revogação de sessão, garantindo que um refresh token já usado ou revogado deixa de funcionar.",
        "Define papéis e permissões, e escreve um middleware que autoriza cada rota conforme o papel do utilizador.",
        "Implementa o fluxo de OAuth2 com um fornecedor externo, trocando o código de autorização por um token e criando ou associando o utilizador local.",
        "Escreve testes que confirmam que uma rota protegida rejeita pedidos sem token, com token inválido, com token expirado, e com papel insuficiente.",
      ],
    },
    {
      id: "d7",
      titulo: "Projeto 3 — Sistema bancário com garantias transacionais",
      faixa: "11 exercícios",
      descricao: "Transferências entre contas são o exemplo clássico de consistência de dados: o dinheiro não pode desaparecer nem duplicar, mesmo com operações simultâneas e falhas a meio.",
      recursos: [
        { label: "PostgreSQL — níveis de isolamento", url: "https://www.postgresql.org/docs/current/transaction-iso.html" },
        { label: "PostgreSQL — bloqueios explícitos", url: "https://www.postgresql.org/docs/current/explicit-locking.html" },
        { label: "Go — pacote database/sql", url: "https://pkg.go.dev/database/sql" },
      ],
      encaixaDepoisDe: "b15",
      exercicios: [
        "Modela as entidades de conta e de movimento, guardando os montantes em cêntimos como inteiros, e explica por escrito porque usar float64 para dinheiro é perigoso.",
        "Cria as migrations das tabelas de contas e de movimentos, com as restrições de integridade adequadas.",
        "Implementa o depósito e o levantamento como operações que registam sempre um movimento, em vez de alterarem o saldo isoladamente.",
        "Implementa a transferência entre duas contas dentro de uma única transação, garantindo que o débito e o crédito acontecem ambos ou nenhum acontece.",
        "Impede saldos negativos com uma verificação feita dentro da transação, e não antes dela, para evitares uma condição de corrida.",
        "Escreve um teste que executa várias transferências em simultâneo sobre a mesma conta, e confirma que o saldo final está correto.",
        "Provoca um deadlock de propósito, transferindo em sentidos opostos ao mesmo tempo, e resolve-o bloqueando as contas sempre pela mesma ordem de identificador.",
        "Compara os níveis de isolamento de transação disponíveis, e escolhe o adequado explicando por escrito o que cada um evita.",
        "Implementa idempotência nas transferências através de uma chave única por pedido, para que uma repetição do mesmo pedido não duplique o movimento.",
        "Calcula o saldo a partir da soma dos movimentos e compara com o saldo guardado, criando uma verificação de consistência.",
        "Escreve os testes de integração de todo este fluxo contra uma base de dados real.",
      ],
    },
    {
      id: "d8",
      titulo: "Projeto 4 — Cache com Redis",
      faixa: "7 exercícios",
      descricao: "Cache acelera leituras frequentes, mas introduz o problema de servir dados desatualizados. Este projeto trata cache como otimização, nunca como fonte de verdade.",
      recursos: [
        { label: "Redis — documentação", url: "https://redis.io/docs/latest/" },
        { label: "go-redis", url: "https://github.com/redis/go-redis" },
        { label: "Redis — imagem oficial Docker", url: "https://hub.docker.com/_/redis" },
      ],
      encaixaDepoisDe: "d5",
      exercicios: [
        "Sobe o Redis com Docker, e confirma o acesso com o redis-cli ou com o cliente Go.",
        "Liga a aplicação ao Redis com o go-redis, e guarda e lê um primeiro valor.",
        "Aplica o padrão cache-aside numa leitura frequente: procura primeiro na cache, e só vai à base de dados quando não encontrar.",
        "Define um tempo de expiração adequado para cada tipo de dado, e explica por escrito o critério que usaste.",
        "Invalida a entrada em cache sempre que o dado for alterado, para não servires informação desatualizada.",
        "Serializa as estruturas para JSON antes de as guardares, e desserializa na leitura.",
        "Garante que a aplicação continua a funcionar quando o Redis estiver indisponível, tratando a cache como otimização e não como dependência crítica.",
      ],
    },
    {
      id: "d9",
      titulo: "Projeto 5 — Processamento assíncrono com mensageria",
      faixa: "10 exercícios",
      descricao: "Trabalho pesado sai do caminho do pedido HTTP e passa para uma fila. Ganha-se resposta rápida, mas passa a ser preciso lidar com repetições, falhas e mensagens que nunca conseguem ser processadas.",
      recursos: [
        { label: "RabbitMQ — tutoriais em Go", url: "https://www.rabbitmq.com/tutorials/tutorial-one-go" },
        { label: "amqp091-go — cliente RabbitMQ", url: "https://github.com/rabbitmq/amqp091-go" },
        { label: "Apache Kafka — documentação", url: "https://kafka.apache.org/documentation/" },
        { label: "franz-go — cliente Kafka", url: "https://github.com/twmb/franz-go" },
      ],
      encaixaDepoisDe: "b14",
      exercicios: [
        "Sobe um RabbitMQ ou um Kafka com Docker, e confirma o acesso à interface de administração ou às ferramentas de linha de comandos.",
        "Publica a tua primeira mensagem a partir de um produtor escrito em Go.",
        "Consome essa mensagem num programa separado, confirmando que produtor e consumidor correm de forma independente.",
        "Define o formato das mensagens como um contrato explícito em JSON, incluindo um campo de versão.",
        "Publica um evento a partir de um caso de uso, por exemplo quando um pedido é criado, sem que o caso de uso conheça os detalhes do transporte.",
        "Confirma o processamento da mensagem apenas depois de o trabalho estar concluído, para não perderes mensagens em caso de falha a meio.",
        "Implementa uma política de repetição com espera crescente para as mensagens que falham por motivos temporários.",
        "Encaminha para uma fila de mensagens mortas as que falham repetidamente, e explica por escrito porque não se deve tentar indefinidamente.",
        "Torna o consumidor idempotente, garantindo que processar a mesma mensagem duas vezes não duplica o efeito.",
        "Processa mensagens em paralelo com vários consumidores, e confirma que a ordem e a consistência se mantêm dentro do que o teu domínio exige.",
      ],
    },
    {
      id: "d10",
      titulo: "Projeto 6 — Integração externa com gRPC e webhooks",
      faixa: "7 exercícios",
      descricao: "Duas formas de falar com o mundo exterior: gRPC para comunicação entre serviços próprios, com contrato forte, e webhooks para receber eventos de serviços de terceiros.",
      recursos: [
        { label: "gRPC — guia de início em Go", url: "https://grpc.io/docs/languages/go/quickstart/" },
        { label: "Protocol Buffers — documentação", url: "https://protobuf.dev/" },
        { label: "gRPC — códigos de estado", url: "https://grpc.io/docs/guides/status-codes/" },
      ],
      encaixaDepoisDe: "d5",
      exercicios: [
        "Instala o protoc e os plugins de Go, e confirma a instalação gerando código a partir de um ficheiro .proto simples.",
        "Define o contrato do serviço num ficheiro .proto, com as mensagens de pedido e de resposta.",
        "Implementa o servidor gRPC a partir do código gerado, servindo os métodos definidos no contrato.",
        "Implementa o cliente gRPC noutro serviço, e chama o método passando um context.Context com timeout.",
        "Trata os erros de gRPC com os códigos de estado próprios do protocolo, em vez de devolveres apenas mensagens de texto.",
        "Recebe webhooks de um serviço externo num endpoint HTTP, validando a assinatura do pedido antes de confiares no conteúdo.",
        "Responde ao webhook rapidamente e processa o trabalho pesado de forma assíncrona, e explica por escrito porque a maioria dos fornecedores exige uma resposta rápida.",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Nível 3 — Sénior
// ---------------------------------------------------------------------------

const TRILHA_N3_CONCEITOS = {
  id: "n3conceitos",
  titulo: "Operação e desempenho",
  intro: "4 blocos sobre o que só aparece quando o sistema está em produção e com carga: saber o que se passa lá dentro, aguentar falhas, medir antes de otimizar, e correr em infraestrutura declarada como código.",
  blocos: [
    {
      id: "b19",
      titulo: "Bloco 19 — Observabilidade",
      faixa: "Ex 19.1–19.12",
      descricao: "Um sistema distribuído sem observabilidade é uma caixa fechada. Logs estruturados, métricas e tracing são as três formas de ver lá para dentro, e cada uma responde a um tipo diferente de pergunta.",
      recursos: [
        { label: "Go — pacote log/slog", url: "https://pkg.go.dev/log/slog" },
        { label: "Prometheus — cliente Go", url: "https://prometheus.io/docs/guides/go-application/" },
        { label: "OpenTelemetry — Go", url: "https://opentelemetry.io/docs/languages/go/" },
        { label: "Jaeger — introdução", url: "https://www.jaegertracing.io/docs/latest/getting-started/" },
        { label: "Grafana — documentação", url: "https://grafana.com/docs/grafana/latest/" },
      ],
      exercicios: [
        "Substitui os fmt.Println por logging estruturado com log/slog, emitindo cada linha em JSON com nível e campos nomeados.",
        "Adiciona a cada linha de log o identificador de pedido que vem do context, para conseguires seguir um pedido do princípio ao fim.",
        "Define os níveis de log com critério, e explica por escrito o que justifica registar um erro em vez de um aviso.",
        "Garante que nenhum dado sensível, como palavras-passe, tokens ou dados pessoais, chega aos logs, e escreve um teste que o confirme.",
        "Expõe métricas em formato Prometheus num endpoint /metrics, usando a biblioteca oficial de Go.",
        "Instrumenta os quatro sinais essenciais do serviço: taxa de pedidos, taxa de erros, duração e saturação.",
        "Sobe o Prometheus com Docker, e confirma que ele está mesmo a recolher as métricas do teu serviço.",
        "Cria um painel no Grafana com os sinais que instrumentaste.",
        "Define um alerta para uma condição que justifique acordar alguém de madrugada, e explica por escrito porque as outras condições não justificam.",
        "Instrumenta o serviço com OpenTelemetry, gerando spans para as operações principais.",
        "Propaga o contexto de tracing entre dois serviços, e confirma no Jaeger que o percurso aparece como uma única árvore.",
        "Usa um trace real para localizares onde se perde a maior parte do tempo num pedido lento.",
      ],
    },
    {
      id: "b20",
      titulo: "Bloco 20 — Resiliência",
      faixa: "Ex 20.1–20.11",
      descricao: "Falhas em sistemas distribuídos não são exceção, são rotina. Este bloco trata de conter falhas em vez de as propagar, e de desligar sem deixar trabalho a meio.",
      recursos: [
        { label: "Go — pacote x/time/rate", url: "https://pkg.go.dev/golang.org/x/time/rate" },
        { label: "Go — Graceful shutdown com http.Server", url: "https://pkg.go.dev/net/http#Server.Shutdown" },
        { label: "gobreaker — circuit breaker em Go", url: "https://github.com/sony/gobreaker" },
        { label: "AWS — Timeouts, retries e backoff com jitter", url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/" },
      ],
      exercicios: [
        "Define timeouts explícitos em todas as chamadas de saída, e explica por escrito porque um cliente HTTP sem timeout é um risco de indisponibilidade.",
        "Configura ReadTimeout, WriteTimeout e IdleTimeout no servidor HTTP.",
        "Implementa repetição com espera exponencial e jitter, e explica por escrito porque o jitter evita que todos os clientes voltem em simultâneo.",
        "Distingue as operações que são seguras de repetir das que não são, e garante que só repetes as primeiras.",
        "Implementa um circuit breaker que deixa de chamar um serviço em falha, e o volta a testar passado um intervalo.",
        "Testa o circuit breaker simulando um serviço externo indisponível, e confirma as três transições de estado.",
        "Implementa limitação de taxa por cliente com golang.org/x/time/rate, devolvendo 429 quando o limite for ultrapassado.",
        "Aplica contrapressão a uma fila de trabalho, recusando trabalho novo quando a fila está cheia em vez de acumulares indefinidamente.",
        "Implementa encerramento gracioso: deixa de aceitar pedidos novos, termina os que estão em curso, e só depois desliga.",
        "Garante que o encerramento gracioso fecha também as ligações de base de dados e os consumidores de mensagens, com um prazo máximo.",
        "Adiciona sondas de estado de vida e de prontidão, e explica por escrito a diferença entre estar vivo e estar pronto a receber tráfego.",
      ],
    },
    {
      id: "b21",
      titulo: "Bloco 21 — Desempenho: profiling e carga",
      faixa: "Ex 21.1–21.10",
      descricao: "Otimizar sem medir é adivinhar. Este bloco treina o ciclo completo: medir sob carga realista, encontrar o gargalo real com pprof, corrigir, e medir outra vez para confirmar.",
      recursos: [
        { label: "Go — pprof", url: "https://pkg.go.dev/runtime/pprof" },
        { label: "Go Blog — Profiling Go Programs", url: "https://go.dev/blog/pprof" },
        { label: "Go — pacote net/http/pprof", url: "https://pkg.go.dev/net/http/pprof" },
        { label: "benchstat", url: "https://pkg.go.dev/golang.org/x/perf/cmd/benchstat" },
        { label: "k6 — testes de carga", url: "https://grafana.com/docs/k6/latest/" },
      ],
      exercicios: [
        "Escreve um benchmark com testing.B para a função que suspeitas ser lenta.",
        "Usa b.ReportAllocs() para veres as alocações por operação, e reduz as que forem evitáveis.",
        "Compara duas implementações com o benchstat, e confirma se a diferença é estatisticamente significativa ou apenas ruído.",
        "Recolhe um perfil de CPU com o pprof, e identifica a função onde o tempo é realmente gasto.",
        "Recolhe um perfil de memória, e distingue o que é alocação legítima do que é desperdício.",
        "Expõe o net/http/pprof no serviço, protegido de forma a não ficar acessível publicamente.",
        "Escreve um teste de carga com k6 ou vegeta, com um cenário parecido com o uso real do sistema.",
        "Mede a latência em percentis, como p50, p95 e p99, em vez de média, e explica por escrito porque a média engana.",
        "Encontra o gargalo real sob carga, corrige-o, e mede outra vez para confirmares o ganho.",
        "Documenta um caso em que decidiste não otimizar, explicando porque a complexidade acrescentada não compensava o ganho.",
      ],
    },
    {
      id: "b22",
      titulo: "Bloco 22 — Kubernetes e infraestrutura como código",
      faixa: "Ex 22.1–22.10",
      descricao: "Correr em Kubernetes muda a forma como a aplicação arranca, encerra e é configurada. Declarar a infraestrutura como código torna o ambiente reproduzível em vez de artesanal.",
      recursos: [
        { label: "Kubernetes — conceitos", url: "https://kubernetes.io/docs/concepts/" },
        { label: "kind — Kubernetes local", url: "https://kind.sigs.k8s.io/" },
        { label: "Terraform — documentação", url: "https://developer.hashicorp.com/terraform/docs" },
        { label: "Helm — documentação", url: "https://helm.sh/docs/" },
        { label: "Kustomize", url: "https://kustomize.io/" },
      ],
      exercicios: [
        "Sobe um cluster Kubernetes local com kind ou minikube, e confirma o acesso com o kubectl.",
        "Escreve os manifestos de Deployment e de Service da tua aplicação, e coloca-a a correr no cluster local.",
        "Configura os pedidos e os limites de CPU e memória, e explica por escrito o que acontece quando cada um é ultrapassado.",
        "Liga ao Deployment as sondas de vida e de prontidão que criaste no Bloco 20.",
        "Passa a configuração por ConfigMap e os segredos por Secret, sem deixares nada fixo nos manifestos.",
        "Faz uma atualização progressiva sem downtime, e confirma o resultado com um teste de carga a correr durante a atualização.",
        "Descreve a mesma infraestrutura como código com Terraform, aplicando contra o cluster local.",
        "Guarda o estado do Terraform fora da tua máquina, e explica por escrito porque o estado partilhado é crítico em equipa.",
        "Usa Helm ou Kustomize para tratares as diferenças entre ambientes sem duplicares manifestos.",
        "Provisiona um ambiente numa cloud real e desliga tudo no fim, para não acumulares custos. Este exercício é o único do bloco que pode ter custo, e podes saltá-lo sem perder a matéria.",
      ],
    },
  ],
};

const TRILHA_N3_PROJETOS = {
  id: "n3projetos",
  titulo: "Sistemas distribuídos",
  intro: "5 projetos onde as decisões passam a ter consequências difíceis de reverter. A partir daqui não há uma resposta certa, há compromissos que é preciso justificar.",
  blocos: [
    {
      id: "d11",
      titulo: "Projeto 1 — Sistema distribuído com Saga e Outbox",
      faixa: "14 exercícios",
      descricao: "Vários serviços a colaborar numa operação que atravessa fronteiras, sem transação distribuída. Consistência eventual, entrega duplicada e falhas parciais deixam de ser teoria.",
      recursos: [
        { label: "Padrão Saga", url: "https://microservices.io/patterns/data/saga.html" },
        { label: "Padrão Transactional Outbox", url: "https://microservices.io/patterns/data/transactional-outbox.html" },
        { label: "NATS — documentação", url: "https://docs.nats.io/" },
        { label: "OpenTelemetry — Go", url: "https://opentelemetry.io/docs/languages/go/" },
      ],
      encaixaDepoisDe: "b19",
      exercicios: [
        "Divide um domínio em dois ou três serviços com responsabilidades claras, e justifica por escrito onde traçaste as fronteiras.",
        "Define os contratos entre serviços, usando gRPC para as chamadas diretas e eventos para o resto.",
        "Implementa o padrão Outbox: grava o evento na mesma transação que altera os dados.",
        "Escreve o publicador que lê a outbox e envia os eventos, marcando-os como publicados.",
        "Garante entrega pelo menos uma vez, partindo do princípio de que vão acontecer duplicados.",
        "Torna cada consumidor idempotente, guardando os identificadores dos eventos já processados.",
        "Implementa uma saga coreografada para uma operação que atravessa serviços, como criar um pedido e reservar stock.",
        "Implementa as transações compensatórias para cada passo que possa falhar.",
        "Provoca uma falha a meio da saga, e confirma que o sistema regressa a um estado coerente.",
        "Compara saga coreografada com saga orquestrada, e justifica por escrito a que escolheste.",
        "Lida com eventos que chegam fora de ordem, e explica por escrito porque a ordem global raramente está garantida.",
        "Propaga o tracing distribuído através dos eventos, para conseguires ver a saga inteira num único percurso.",
        "Documenta o que acontece ao sistema quando um dos serviços fica em baixo durante horas.",
        "Escreve testes de integração que cobrem o caminho feliz e pelo menos dois caminhos de falha.",
      ],
    },
    {
      id: "d12",
      titulo: "Projeto 2 — API Gateway próprio",
      faixa: "10 exercícios",
      descricao: "Um ponto de entrada único que concentra autenticação, limites e observabilidade. Construir um serve sobretudo para perceber o que uma solução pronta faz, e quando não vale a pena escrever a tua.",
      recursos: [
        { label: "Go — httputil.ReverseProxy", url: "https://pkg.go.dev/net/http/httputil#ReverseProxy" },
        { label: "Kong — conceitos de API Gateway", url: "https://docs.konghq.com/gateway/latest/" },
        { label: "Envoy — documentação", url: "https://www.envoyproxy.io/docs/envoy/latest/" },
      ],
      encaixaDepoisDe: "b20",
      exercicios: [
        "Escreve um proxy inverso em Go com httputil.ReverseProxy, encaminhando para dois serviços internos.",
        "Encaminha por caminho e por cabeçalho, mantendo a configuração de rotas fora do código.",
        "Centraliza a autenticação no gateway, para os serviços internos não repetirem essa lógica.",
        "Aplica limitação de taxa por cliente ao nível do gateway.",
        "Aplica timeouts e circuit breakers por serviço de destino.",
        "Propaga o identificador de pedido e o contexto de tracing para os serviços a jusante.",
        "Normaliza as respostas de erro, para quem consome a API ver sempre o mesmo formato.",
        "Agrega respostas de dois serviços num único pedido, e explica por escrito quando isso compensa e quando cria acoplamento.",
        "Mede a latência que o gateway acrescenta, e decide por escrito se o custo se justifica.",
        "Compara a tua solução com um service mesh e com um gateway pronto, e justifica por escrito em que situação não valeria a pena escrever o teu.",
      ],
    },
    {
      id: "d13",
      titulo: "Projeto 3 — Base de dados à escala",
      faixa: "12 exercícios",
      descricao: "Índices, réplicas, particionamento e sharding, e a decisão de aplicar ou não CQRS e event sourcing. Aqui o exercício mais importante é justificar quando não aplicar.",
      recursos: [
        { label: "PostgreSQL — EXPLAIN", url: "https://www.postgresql.org/docs/current/using-explain.html" },
        { label: "PostgreSQL — particionamento", url: "https://www.postgresql.org/docs/current/ddl-partitioning.html" },
        { label: "PostgreSQL — replicação", url: "https://www.postgresql.org/docs/current/high-availability.html" },
        { label: "Padrão CQRS", url: "https://microservices.io/patterns/data/cqrs.html" },
        { label: "Padrão Event Sourcing", url: "https://microservices.io/patterns/data/event-sourcing.html" },
      ],
      encaixaDepoisDe: "d11",
      exercicios: [
        "Identifica com EXPLAIN as consultas mais lentas, e cria os índices em falta.",
        "Mede o impacto de cada índice nas escritas, e explica por escrito o compromisso que estás a aceitar.",
        "Configura uma réplica de leitura, e encaminha as leituras para ela.",
        "Lida com o atraso de replicação, e explica por escrito porque ler logo a seguir a escrever pode devolver dados antigos.",
        "Particiona uma tabela grande por intervalo de datas, e mede a diferença nas consultas.",
        "Desenha uma estratégia de sharding, e justifica por escrito a chave que escolheste.",
        "Explica por escrito o que passa a ser difícil depois de shardar, como junções e transações entre shards.",
        "Separa os modelos de leitura e de escrita, aplicando CQRS a uma parte do sistema onde isso compense.",
        "Implementa event sourcing num agregado em que o histórico tenha valor real para o negócio.",
        "Reconstrói o estado a partir dos eventos, e cria um snapshot para acelerar essa reconstrução.",
        "Documenta por escrito porque não aplicaste CQRS nem event sourcing ao resto do sistema.",
        "Escreve uma migração de esquema sem downtime numa tabela grande, em passos compatíveis com a versão anterior da aplicação.",
      ],
    },
    {
      id: "d14",
      titulo: "Projeto 4 — Pipeline de CI/CD",
      faixa: "9 exercícios",
      descricao: "Do push ao deploy sem passos manuais, com portões de qualidade e segurança pelo caminho, e com forma de reverter depressa quando algo corre mal.",
      recursos: [
        { label: "GitHub Actions — documentação", url: "https://docs.github.com/en/actions" },
        { label: "govulncheck", url: "https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck" },
        { label: "Sigstore cosign — assinatura de imagens", url: "https://docs.sigstore.dev/cosign/signing/overview/" },
        { label: "Argo Rollouts — lançamentos progressivos", url: "https://argo-rollouts.readthedocs.io/en/stable/" },
      ],
      encaixaDepoisDe: "b22",
      exercicios: [
        "Monta um pipeline que corre lint, testes e build a cada push.",
        "Corre também os testes de integração no pipeline, levantando as dependências como serviços de CI.",
        "Faz o pipeline falhar quando a cobertura descer abaixo do limite que definires.",
        "Analisa as vulnerabilidades das dependências com o govulncheck, e trata o pipeline como bloqueado quando encontrar algo grave.",
        "Constrói a imagem e publica-a num registo, etiquetada com o commit que a originou.",
        "Assina a imagem ou gera o inventário das suas dependências, e explica por escrito porque a proveniência importa.",
        "Faz deploy automático para um ambiente de testes a cada integração na linha principal.",
        "Exige aprovação manual para produção, e implementa uma forma de reverter rapidamente.",
        "Faz um lançamento progressivo para uma fração do tráfego, com reversão automática quando as métricas piorarem. Se não tiveres ambiente onde o experimentar, descreve o plano por escrito.",
      ],
    },
    {
      id: "d15",
      titulo: "Projeto 5 — Decisões de arquitetura documentadas",
      faixa: "7 exercícios",
      descricao: "A parte do trabalho sénior que fica escrita. Um ADR não serve para provar que se acertou, serve para quem vier depois perceber o contexto em que se decidiu.",
      recursos: [
        { label: "Architecture Decision Records", url: "https://adr.github.io/" },
        { label: "Michael Nygard — Documenting Architecture Decisions", url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions" },
        { label: "Modelo C4 de diagramas", url: "https://c4model.com/" },
      ],
      encaixaDepoisDe: "d13",
      exercicios: [
        "Escreve o teu primeiro ADR sobre uma decisão que já tomaste nestes projetos, com contexto, opções, decisão e consequências.",
        "Escreve um ADR sobre uma decisão em que escolheste a opção mais simples, e regista aquilo de que abdicaste.",
        "Regista as opções que rejeitaste e as razões, para quem vier depois não ter de repetir a análise.",
        "Escreve um ADR sobre uma decisão que se revelou errada, e o que farias de diferente.",
        "Documenta a arquitetura do sistema distribuído com diagramas em níveis, do panorama geral ao detalhe.",
        "Escreve o runbook de uma falha provável, com sintomas, diagnóstico e mitigação.",
        "Revê os ADRs anteriores e marca os que foram substituídos, mantendo o histórico em vez de o apagares.",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Guias de preparação — o que ter pronto antes de começar cada bloco.
// A ideia é não assumir que quem chega já tem o ambiente montado.
// ---------------------------------------------------------------------------

const GUIAS = {
  b0: {
    precisas: [
      "Go instalado na máquina (o exercício 1 deste bloco trata disso)",
      "Um editor de texto com suporte para Go, como VS Code com a extensão oficial",
    ],
    nota: "Este é o ponto de partida. Não é preciso saber nada de Go para começar aqui.",
  },
  b1: { precisas: ["Go instalado e um módulo criado com go mod init"] },
  b2: { precisas: ["Go instalado"], nota: "Vais reutilizar o struct Task do Bloco 1." },
  b3: { precisas: ["Go instalado"], nota: "Vais reutilizar o Produto e o BuscarPorID dos blocos anteriores." },
  b4: { precisas: ["Go instalado"] },
  b5: { precisas: ["Go instalado"], nota: "A partir daqui o projeto passa a ter várias pastas, por isso convém tê-lo dentro de um módulo próprio." },
  b6: {
    precisas: [
      "golangci-lint instalado (ver instruções nos recursos do bloco)",
      "A biblioteca testify, que se instala com go get github.com/stretchr/testify",
      "Uma conta no GitHub e o projeto num repositório, para o exercício de CI",
    ],
  },
  b7: { precisas: ["Go instalado"] },
  b8: {
    precisas: [
      "Go instalado",
      "Uma ferramenta para testar pedidos HTTP: o curl serve, e o Postman ou Insomnia são alternativas gráficas",
    ],
  },
  b9: { precisas: ["O router chi, que se instala com go get github.com/go-chi/chi/v5"] },
  b10: { precisas: ["A API do Bloco 9 a funcionar"] },
  b11: { precisas: ["A API do Bloco 10 a funcionar"], nota: "Os testes deste bloco correm contra o service e o repository, sem servidor a correr." },
  b12: {
    precisas: [
      "Uma conta gratuita no Render ou no Railway",
      "O projeto num repositório do GitHub, que é de onde estas plataformas fazem o deploy",
    ],
  },
  d1: { precisas: ["Um ficheiro de texto ou CSV com os dados de entrada, que podes criar à mão"] },
  d2: { precisas: ["Go instalado"] },
  d3: { precisas: ["Um ficheiro de texto com os dados dos participantes, que podes criar à mão"] },
  d4: { precisas: ["Go instalado"] },

  b13: { precisas: ["Go instalado"], nota: "Não precisas de base de dados para a maior parte deste bloco; só o último exercício a usa." },
  b14: { precisas: ["Go instalado"], nota: "A flag -race já vem com o Go, não é preciso instalar nada à parte." },
  b15: {
    precisas: [
      "Docker instalado, para levantares o PostgreSQL sem o instalares diretamente na máquina",
      "O driver pgx, que se instala com go get github.com/jackc/pgx/v5",
      "A ferramenta golang-migrate, para as migrations",
    ],
    nota: "Se preferires, podes instalar o PostgreSQL nativamente em vez de usares Docker. O resto do bloco funciona igual.",
  },
  b16: { precisas: ["A base de dados do Bloco 15 a funcionar, para poderes ter duas implementações do mesmo repositório"] },
  b17: {
    precisas: [
      "O mockery ou o gomock instalado, para gerar mocks",
      "Docker, se quiseres fazer os testes de integração com testcontainers",
    ],
  },
  b18: { precisas: ["Docker Engine e docker compose instalados"], nota: "Em Linux, o docker compose costuma vir como plugin separado; confirma com docker compose version." },

  d5: { precisas: ["Os blocos 13 a 18 concluídos, porque este projeto junta tudo o que eles cobrem"] },
  d6: {
    precisas: [
      "A API do Projeto 1 a funcionar",
      "As bibliotecas golang-jwt e golang.org/x/crypto/bcrypt",
      "Uma conta num fornecedor de OAuth2, como Google ou GitHub, para o exercício do fluxo externo",
    ],
  },
  d7: { precisas: ["PostgreSQL a correr e as migrations a funcionar, como praticaste no Bloco 15"] },
  d8: { precisas: ["Redis a correr, mais simples via Docker", "O cliente go-redis"] },
  d9: {
    precisas: [
      "RabbitMQ ou Kafka a correr, mais simples via Docker",
      "O cliente correspondente em Go: amqp091-go para RabbitMQ, ou franz-go para Kafka",
    ],
    nota: "Escolhe um dos dois. RabbitMQ é mais simples para começar; Kafka é mais comum em sistemas de grande volume.",
  },
  d10: {
    precisas: [
      "O compilador protoc e os plugins protoc-gen-go e protoc-gen-go-grpc",
      "Uma ferramenta para expor a tua máquina à internet, como o ngrok, para receberes webhooks reais",
    ],
  },

  b19: {
    precisas: [
      "Docker, para levantares Prometheus, Grafana e Jaeger localmente",
      "As bibliotecas prometheus/client_golang e as de OpenTelemetry para Go",
    ],
    nota: "O log/slog faz parte da biblioteca padrão desde o Go 1.21, não é preciso instalar nada para os primeiros exercícios.",
  },
  b20: {
    precisas: [
      "Um serviço externo que possas desligar à vontade, para simulares falhas: serve outro contentor teu",
      "As bibliotecas golang.org/x/time/rate e, se quiseres, sony/gobreaker",
    ],
    nota: "Podes escrever o teu próprio circuit breaker em vez de usares uma biblioteca. Escrevê-lo à mão ensina mais.",
  },
  b21: {
    precisas: [
      "O k6 ou o vegeta instalado, para os testes de carga",
      "O benchstat, que se instala com go install golang.org/x/perf/cmd/benchstat@latest",
    ],
    nota: "O pprof e o testing.B já vêm com o Go. Para as medições fazerem sentido, fecha o resto das aplicações pesadas enquanto corres os testes.",
  },
  b22: {
    precisas: [
      "O kind ou o minikube, para teres um cluster Kubernetes na tua própria máquina",
      "O kubectl e o Terraform",
      "Pelo menos 8 GB de RAM disponíveis, porque um cluster local com a stack toda pesa",
    ],
    custos: "Só o último exercício pede uma cloud real e pode ter custo. Todos os outros correm localmente, de graça. Se avançares para a cloud, usa o nível gratuito e desliga tudo no fim.",
  },
  d11: {
    precisas: [
      "Kafka, NATS ou RabbitMQ a correr, mais simples via Docker",
      "PostgreSQL, para a tabela de outbox",
      "A stack de observabilidade do Bloco 19, para conseguires seguir a saga inteira",
    ],
    nota: "Este é o projeto mais pesado do percurso. Vale mais fazê-lo com dois serviços bem feitos do que com cinco pela metade.",
  },
  d12: { precisas: ["Dois serviços internos a correr, que podem ser os do Projeto 1"] },
  d13: {
    precisas: [
      "PostgreSQL com possibilidade de configurares uma réplica, o que via Docker se faz com dois contentores",
      "Um volume de dados suficiente para as diferenças serem visíveis: gera alguns milhões de linhas",
    ],
    nota: "Sem dados a sério, os índices e o particionamento não mostram diferença nenhuma. Gerar os dados faz parte do exercício.",
  },
  d14: {
    precisas: [
      "O projeto num repositório do GitHub, com GitHub Actions ativo",
      "Um registo de imagens, sendo o GitHub Container Registry o mais direto",
    ],
    custos: "GitHub Actions é gratuito em repositórios públicos. O último exercício, de lançamento progressivo, precisa de um ambiente onde o experimentar; se não tiveres, descreve o plano por escrito em vez de o executares.",
  },
  d15: {
    precisas: ["Nada além de um editor de texto e dos projetos anteriores para teres sobre o que decidir"],
    nota: "É o bloco mais barato de executar e o mais difícil de fazer bem. Escrever uma decisão obriga a perceber que a tomaste.",
  },
};

// ---------------------------------------------------------------------------
// Níveis
// ---------------------------------------------------------------------------

const NIVEIS = [
  {
    id: "n1",
    titulo: "Nível 1",
    subtitulo: "Iniciante",
    descricao: "Dos fundamentos da linguagem até uma API REST publicada.",
    trilhas: [TRILHA_PRINCIPAL, TRILHA_DOMINIOS],
  },
  {
    id: "n2",
    titulo: "Nível 2",
    subtitulo: "Pleno",
    descricao: "Arquitetura, concorrência, base de dados, mensageria e containers.",
    trilhas: [TRILHA_N2_CONCEITOS, TRILHA_N2_PROJETOS],
  },
  {
    id: "n3",
    titulo: "Nível 3",
    subtitulo: "Sénior",
    descricao: "Sistemas distribuídos, observabilidade, resiliência e desempenho.",
    trilhas: [TRILHA_N3_CONCEITOS, TRILHA_N3_PROJETOS],
    aviso: "Este nível é menos verificável do que os anteriores. Nos primeiros, ou o teste passa ou não passa; aqui, escolher entre CQRS e um CRUD simples é julgamento, e uma caixa marcada não valida julgamento, só regista que passaste por ali. Parte do que se aprende a este nível vem da revisão por alguém mais experiente e do impacto real em produção, que nenhum percurso de exercícios substitui. Trata isto como mapa, não como certificado.",
  },
];


