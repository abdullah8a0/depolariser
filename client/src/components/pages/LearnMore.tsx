import React from "react";

import { RouteComponentProps } from "@reach/router";
import "./LearnMore.css";

type Props = RouteComponentProps & {
  userId?: string;
};

const LearnMore = (props: Props) => {
  return (
    <>
      <div className="boxWrapper-1">
        <h2 className="boxTitle">What is it?</h2>

        <h2 className="boxTitle">Why?</h2>

        <div className="content">
          <h4>
            Depolarizer is a website which is designed to figure out your political perspective and then to suggest news articles and sources which
            generally cater to people with opposing viewpoints. This website aims to foster a safe environment to increase the array of news sources
            read by the general public and foster critical thinking and informed discourse.
          </h4>
          <h4>
            The political perspectives are found based upon a theory of political difference presented by Brian Patrick Mitchell in 2006 through a
            book named Eight Ways to Run the Country: A New and Revealing Look at the Left and Right. This theory analyzes modern American political
            perspectives according to their regard for kratos (use of force) and archy (recognition of rank). This results in four main divergent
            traditions in Western political thought: Republican Constitutionalism, Libertarian Individualism, Plutocratic Nationalism, and Democratic
            Progressivism. In addition to these four main traditions, eight distinct political perspectives are identified by Mitchell, which are
            described in more detail below.
          </h4>
          <h4>
            The news sources that are suggested by this website are popular news sources such as New York Times or Fox News that are read by a high
            number of people. In order to suggest news sources, this website makes use of the media bias rating given by Allsides. More detailed
            information on the news sources is given below.
          </h4>
        </div>
        <div className="content">
          <h4>
            There is a growing divide between individuals with opposing political ideologies which leads to increasing hostility and lack of
            compromise between the two sides. Especially in recent years, this divide between liberals and conservatives has increased and political
            polarization has started having detrimental effects on society such as increasing the dysfunction in the government. One of the factors
            that leads to the increase in polarization is reading the same types of news sources. This creates echo chambers, reinforces existing
            ideologies, increases hostility and mistrust, and skews understanding of current events, eventually resulting in polarization.
          </h4>
          <h4>
            This is evidenced by a study by the Pew Research Center which found that there is little overlap of sources when it comes to liberals and
            republicans getting news especially about politics and government. It also found that people are more likely to have close friends that
            share similar political viewpoints as themselves.
          </h4>
          <h4>
            One of the reasons why people refrain from reading news from sources that are in contrast with their viewpoint may be avoiding being
            subjected to the other materials presented in those sources’ websites. For example, one may be disturbed by the ads published on Fox News
            or New York Times and may choose to avoid these sources. Also one may be concerned that visiting these websites provides revenues for the
            opposite view.
          </h4>
          <h4>
            Through this website we aim to address the problem and increase the access to variety of news sources people read. We hope that this can
            help people understand different viewpoints better and foster important discussions.
          </h4>
        </div>
      </div>
      <h2 className="sectionHeading">Political Perspectives:</h2>
      <div className="boxWrapper-2">
        <div className="content">
          <h4 className="p">
            The chart below shows the four main traditions with the vertical axis as a scale of kratos/akrateia and a horizontal axis as a scale of
            archy/anarchy. The vertical axis can be better explained as the legitimacy of using the power of the governmentin order to achieve
            desirable social, economic or foreign policy outcomes. The traditions in the top of the chart are opposed to the use of power by the
            government and the bottom favor towards the use of power by the government. The horizontal axis can be explained through the legitimacy of
            rank, more specifically the preference to live in a stratified society where people are taught to respect and obey their superiors, or an
            egalitarian society in which people are taught to treat everyone as equals. The left side of the chart rejects rank, while the right
            accepts rank.
          </h4>
        </div>
        <div className="four-way-card">
          <h3 className="smallTitle">Republic Constitutionalism:</h3>
          <div className="content">
            <h4 className="p">
              Republic Constitutionalism is placed in the upper right and characterized by pro-archy and anti-kratos. It is a tradition which opposes
              the use of power by the government and favors hierarchy in society.
            </h4>
            <h4 className="p">
              It is a political philosophy that emphasizes the importance of limited government and individual liberty. The central idea is that the
              government should be limited in its scope and power, and that the primary role of the government is to protect the rights and freedoms
              of individuals. The philosophy is rooted in the belief that individuals are best able to govern their own lives and make their own
              decisions, and that the government should not interfere in these affairs unless it is absolutely necessary. Republican constitutionalism
              also generally advocates for a hierarchical social structure based on traditional values and norms with a strong emphasis on family,
              community, and civic duty. This can include the support for traditional gender roles, religious values, and conservative social
              policies.
            </h4>
          </div>
        </div>
        <div className="four-way-card">
          <h3 className="smallTitle">Libertarian Individualism:</h3>
          <div className="content">
            <h4 className="p">
              Libertarian Individualism is placed in the upper left and characterized by anti-archy and anti-kratos. It is a tradition which opposes
              the use of power by the government and opposes hierarchy in society.
            </h4>
            <h4 className="p">
              It is political philosophy that emphasizes the importance of individual liberty and minimal government intervention in people’s lives.
              It is rooted in the belief that individuals should have the right to make their own choices and divisions, and that the government
              should not interfere in these affairs unless absolutely necessary. In the economic sphere, libertarian individualism advocates for
              minimal government regulation and taxation. In the social sphere, libertarian individualism generally does not advocate for social
              hierarchy. Rather, it emphasizes the importance of individual liberty and autonomy, and generally opposes government intervention in
              personal and private matters.
            </h4>
          </div>
        </div>
        <div className="four-way-card">
          <h3 className="smallTitle">Democratic Progressivism:</h3>
          <div className="content">
            <h4 className="p">
              Democratic Progressivism is placed in the bottom left and characterized by anti-archy and pro-kratos. It is a tradition which favors the
              use of power by the government and opposes hierarchy in society.
            </h4>
            <h4 className="p">
              It is a political ideology that emphasizes the importance of democracy and progressive social and economic policies. The central idea of
              democratic progressivism is that the government should play an active role in addressing social and economic issues such as poverty,
              inequality, and discrimination. In regards to social hierarchy, a fair and equal society is advocated for since democratic progressivism
              emphasizes the importance of equality of opportunity.
            </h4>
          </div>
        </div>
        <div className="four-way-card">
          <h3 className="smallTitle">Plutocratic Nationalism:</h3>
          <div className="content">
            <h4 className="p">
              Plutocratic Nationalism is placed in the bottom right and characterized by pro-archy and pro-kratos. It is a tradition which opposes the
              use of power by the government and opposes hierarchy in society.
            </h4>
            <h4 className="p">
              It is a political ideology that believes the interests of the wealthy and the interests of the nation are closely aligned. Consequently,
              that means that policies that benefit the wealthy will also benefit the nation as a whole. Overall, the wealthy hold a significant power
              and people believe in the importance of the United States and its culture.
            </h4>
          </div>
        </div>
        <div className="content">
          <h4 className="p">
            These four main traditions can be divided into more detailed eight distinct political perspectives represented in contemporary American
            politics. A potential ninth political perspective is populism, which is vaguely defined and situation dependent. There is no fixed
            character of this group other than opposition to the prevailing power.
          </h4>
        </div>
      </div>
      <div className="boxWrapper-3">
        <div className="eight-way-card">
          <h3 className="smallTitle">Communitarian:</h3>
          <div className="content">
            <h4 className="p">
              Communitarianism is characterized by being ambivalent towards archy and prokratos, which means it is ambivalent about rank and supports
              an activist government. This means that a communitarian believes in the importance of community and the interdependence of individuals
              within a community. The need for society to balance individual rights and interests with the common good is emphasized.
            </h4>
            <h4 className="p">
              Government is a big part of any solution, meaning that new policies and programs are supported. Since the government is likened to a
              ‘hand administering the medicine’, both size and centralization are viewed positively. The main aim of the government is to seek the
              common good. It can be described as being left leaning and statist.
            </h4>
            <h4 className="p">
              The government’s role includes, personal and national security. Certain policies such as a mandatory private health care system, a
              guaranteed safety net for the unemployed, and mandatory retirement savings are also supported. Moreover, the government is tasked with
              providing equal opportunity without demanding equal outcome.
            </h4>
            <h4 className="p">Furthermore, communitarianism is mainly pragmatic, things that work are viewed as being the right things to do.</h4>
          </div>
        </div>
        <div className="eight-way-card">
          <h3 className="smallTitle">Progressive:</h3>
          <div className="content">
            <h4 className="p">
              Progressivism is characterized by being anti archy and prokratos, which means it is egalitarian and supports an activist government. It
              seeks to promote social and political change through reforms that address issues such as inequality, social justice, and the
              environment. A government that is accountable to the will of the people which intervenes is supported for achieving these goals.
            </h4>
            <h4 className="p">
              Overall, change is supported because new is better and progress is inevitable. There is belief that the human condition can be improved
              through moving forward. This leads to a preference for new liberties such as abortion rights instead of old liberties such as gun
              ownership.
            </h4>
            <h4 className="p">
              It is believed that one of the main ways of solving the problem of dominance present in society is through the redistribution of wealth,
              power, and privilege. The government works to eliminate the inequalities of conditions. Consequently, policies such as increased taxes
              on the wealthy, access to healthcare and education for all are supported. It can be described as being leftist social.
            </h4>
          </div>
        </div>
        <div className="eight-way-card">
          <h3 className="smallTitle">Radical:</h3>
          <div className="content">
            <h4 className="p">
              Radicalism is characterized by being anti-archy and ambivalent towards kratos, which means it is egalitarian and is ambivalent about the
              role of government. It seeks fundamental and far-reaching changes to society and its institutions. Consequently, radicals often
              challenge existing power structures and seek to replace them with a more equal and just system.
            </h4>
            <h4 className="p">
              Overall, a radical can be described as being a rebel by nature. As indicated by the description, radicals are generally averse to
              tradition and hierarchy and question decisions by authority. There is belief in the good nature and cooperative spirit of all people.
              Therefore, the aim is to have an egalitarian society which is governed by consensus, similarly to true democracy.
            </h4>
            <h4 className="p">
              Both corporations and the military are viewed negatively. This is because corporations are viewed as entities that prioritize profits
              over the well-being of people and the military is viewed as an obstacle to achieving real change and social justice. Furthermore, the
              main reason for social problems is thought to be oppression which can be solved through radical change.
            </h4>
          </div>
        </div>
        <div className="eight-way-card">
          <h3 className="smallTitle">Individualist:</h3>
          <div className="content">
            <h4 className="p">
              Individualism is characterized by being anti-archy and anti kratos, which means it is egalitarian and supports a limited government. It
              prioritizes the freedoms and liberties of individuals over the collective good or the authority of the state. In general, individual
              property rights, personal responsibility, and minimal government interference in people’s lives are valued.
            </h4>
            <h4 className="p">
              Government is supported in its roles to protect the rights of individuals and enforce contracts between. The higher levels of government
              are given the additional task of keeping the lower levels in check. Consequently, it can be seen that property rights are important and
              the free market is supported. In this way, individualists generally have higher hopes for capitalism than democracy.
            </h4>
            <h4 className="p">
              Overall, individualists feel threatened by social and political pressures since they give ample importance to individual rights and
              liberties. The idea of people trying to impose their morality on others is resented. Moreover, individualists support progress, while
              they view tradition more negatively. They can be viewed as both materialistic and rationalists.
            </h4>
          </div>
        </div>
        <div className="eight-way-card">
          <h3 className="smallTitle">Paleolibertarian:</h3>
          <div className="content">
            <h4 className="p">
              Paleolibertarianism is characterized by being ambivalent towards archy and anti-kratos, which means it is ambivalent about rank and
              supports a limited government. It combines elements of libertarianism with traditional cultural values and beliefs. Freedom, property
              rights, and free markets are emphasized, while also promoting traditional views on social issues such as family values, religion, and
              personal responsibility. Therefore, it can be categorized as a conservative form of libertarianism.
            </h4>
            <h4 className="p">
              Overall, Paleolibertarians believe in the importance of property rights and the protection of individual sovereignty, and support free
              markets. The government is viewed as a potential threat to individual liberties and therefore it can be described as a necessary form of
              evil. There is a belief in man’s ability to live without government. It is suggested that it is better for power to be in the hands of a
              private person or group. Consequently, an antigovernment view persists and an extremely decentralist government is supported.
            </h4>
            <h4 className="p">
              In general, paleolibertarians tend to be critical of modern cultural trends and value tradition. Paleolibertarians also tend to support
              a strong national identity.
            </h4>
          </div>
        </div>
        <div className="eight-way-card">
          <h3 className="smallTitle">Paleoconservative:</h3>
          <div className="content">
            <h4 className="p">
              Paleoconservatism is characterized by being pro-archy and anti-kratos, which means it is hierarchical about rank and supports a limited
              government. It combines elements of conservatism with traditional values and beliefs. There is a strong emphasis on tradition,
              nationalism, and a pacifist foreign policy. Additionally, traditional views on social issues are promoted. It can be described as a
              conservative form of conservatism.
            </h4>
            <h4 className="p">
              Overall, a small government is supported and there is suspicion of business and government working too closely together. This leads to
              support of free enterprise. Moreover, selfish consumerism is criticized and environmental concerns are taken seriously.
            </h4>
            <h4 className="p">
              In general, modern political trends and globalization are criticized. Vague universal values such as freedom, democracy, capitalism, and
              human rights do not seem to be very important. Instead, importance is given to preserving cultural traditions, historical heritage, and
              national sovereignty.
            </h4>
            <h4 className="p">
              In terms of the military, a non-interventionist policy is promoted and military intervention abroad are frowned upon. There is a strong
              belief that the US should focus on protecting its national interests and avoid entanglements in foreign conflicts.
            </h4>
          </div>
        </div>
        <div className="eight-way-card">
          <h3 className="smallTitle">Theoconservative:</h3>
          <div className="content">
            <h4 className="p">
              Theoconsevatism is characterized by being pro-archy and ambivalent towards kratos, which means it is hierarchical about rank and
              ambivalent about the role of government. It combines elements of conservatism with religious values and beliefs, particularly
              Christianity. The role of religion in public life, along with traditional social values such as family, community, and personal
              responsibility are emphasized. Theoconservatism can be viewed as a religious form of conservatism.
            </h4>
            <h4 className="p">
              Overall, religion is believed to have a strong role in shaping society and traditional family and community are seen to be essential to
              preserving moral and cultural values. A hierarchical system in social institutions such as the family, church, and community are
              supported. The main problem of the time is viewed as being the breakdown of social order.
            </h4>
            <h4 className="p">
              In general, a strong national defense, a limited government, and free-market economics are supported. The government is supported based
              on the importance it gives to faith and family since these are immensely important values. Policies that encourage faith and strengthen
              family are supported.
            </h4>
          </div>
        </div>
        <div className="eight-way-card">
          <h3 className="smallTitle">Neoconservative:</h3>
          <div className="content">
            <h4 className="p">
              Neoconservatism is characterized by being pro-archy and pro-kratos, which means it is hierarchical about rank and supports an activist
              government. It combines elements of conservatism and interventionist foreign policy. A limited role for government in people’s lives is
              supported, but at the same time there is belief in the importance of government in promoting economic growth and individual freedom.
              Neoconservatists tend to support free-market capitalism and are often critical of government regulations.
            </h4>
            <h4 className="p">
              The chief concern is the health of the modern, pluralistic capitalist state. The state is viewed as being threatened by the burden of
              government through excessive taxation and regulation. Consequently, a laissez-faire economy is supported.
            </h4>
            <h4 className="p">
              In general, a strong military along with an interventionist foreign policy is emphasized. The promotion of democratic values and
              interests abroad is also supported.
            </h4>
          </div>
        </div>
      </div>

      <h2 className="titleBox">News Sources</h2>
      <h4 className="firstBox paragraph"> The news sources we have used are below.</h4>
    </>
  );
};

export default LearnMore;
