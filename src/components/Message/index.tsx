import * as S from './styles';

export default function Message() {
  const phrases = [
    'Economize dinheiro, economize tempo.',

    'Uma mente organizada leva a uma carteira organizada.',

    'Economizar pode ser fácil - comece com pequenos ajustes no seu dia a dia.',

    'Organização é a chave para economizar dinheiro e evitar o desperdício.',

    'Comece o seu dia organizando-se e economize tempo e energia.',

    'Economize dinheiro - crie um orçamento e siga-o.',

    'Ser organizado significa saber exatamente onde seu dinheiro está indo.',

    'Economize dinheiro e seja mais organizado - faça uma lista de tarefas e priorize-as.',

    'Economize dinheiro comprando apenas o que precisa e não o que quer.',

    'Sua vida ficará mais fácil e mais econômica com um pouco de organização.',

    'A chave para economizar é gastar conscientemente e com sabedoria.',

    'Ser organizado não só economiza dinheiro, mas também reduz o estresse e a ansiedade.',

    'A organização é uma habilidade que pode ser aprendida e aprimorada, e pode ajudar a economizar tempo e dinheiro.',

    'Crie metas financeiras realistas e alcance-as com um plano de ação organizado.',

    'Economizar dinheiro não significa que você tenha que abrir mão de tudo - encontre maneiras criativas de aproveitar a vida sem gastar muito.',

    'Mantenha uma lista de gastos para ter uma visão clara do seu dinheiro e onde pode economizar.',

    'Encontre maneiras de economizar dinheiro em compras cotidianas, como alimentos e roupas, com cupons, ofertas e vendas.',

    'Simplifique sua vida e economize dinheiro optando por uma vida mais minimalista.',
  ];

  const randonIndex = Math.floor(Math.random() * phrases.length);
  return (
    <S.ContainerMessage>
      <p>{phrases[randonIndex]}</p>
    </S.ContainerMessage>
  );
}
