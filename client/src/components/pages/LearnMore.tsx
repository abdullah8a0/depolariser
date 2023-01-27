import React from "react";

import { RouteComponentProps } from "@reach/router";
import "./LearnMore.css";

type Props = RouteComponentProps & {
  userId?: string;
};

const LearnMore = (props: Props) => {
  return (
    <div className="background">
      <div className="box">
        <div className="">
          <h2 className="titleBox">What is it?</h2>
          <div className="paragraph yellowBox">
            <h4>
              Depolarizer is a website which is designed to figure out your political perspective and then to suggest news articles and sources which
              generally cater to people with opposing viewpoints. This website aims to foster a safe environment to increase the array of news sources
              read by the general public and foster critical thinking and informed discourse.
            </h4>
            <h4>
              The political perspectives are found based upon a theory of political difference presented by Brian Patrick Mitchell in 2006 through a
              book named Eight Ways to Run the Country: A New and Revealing Look at the Left and Right. This theory analyzes modern American political
              perspectives according to their regard for kratos (use of force) and archy (recognition of rank). This results in four main divergent
              traditions in Western political thought: Republican Constitutionalism, Libertarian Individualism, Plutocratic Nationalism, and
              Democratic Progressivism. In addition to these four main traditions, eight distinct political perspectives are identified by Mitchell,
              which are described in more detail below.
            </h4>
            <h4>
              The news sources that are suggested by this website are popular news sources such as New York Times and Fox News that are read by a high
              number of people. In order to suggest news sources, this website makes use of the media bias rating given by Allsides. More detailed
              information on the news sources is given below.
            </h4>
          </div>
        </div>
        <div className="">
          <h2 className="titleBox">Why?</h2>
          <div className="paragraph yellowBox">
            <h4>
              There is a growing divide between individuals with opposing political ideologies which leads to increasing hostility and lack of
              compromise between the two sides. Especially in recent years, this divide between liberals and conservatives has increased and political
              polarization has started having detrimental effects on society such as increasing the dysfunction in the government. One of the factors
              that leads to the increase in polarization is reading the same types of news sources. This can lead to political polarization by
              creating echo chambers, reinforcing existing ideologues, increasing hostility and mistrust, and skewing understanding of current events.
            </h4>
            <h4>
              This is enforced by a study by the Pew Research Center which found that there is little overlap of sources when it comes to liberals and
              republicans getting news especially about politics and government. It also found that people are more likely to have close friends that
              share similar political viewpoints as themselves.
            </h4>
            <h4>
              Through this website we aim to increase the variety of news sources people read. We hope that this can help people understand others
              with different viewpoints better and foster important discussions.
            </h4>
          </div>
        </div>
      </div>
      <h2 className="titleBox">Political Perspectives:</h2>
      <div className="paragraph">
        <h4 className="yellowBox">
          The chart below shows the four main traditions with the vertical axis as a scale of kratos/akrateia and a horizontal axis as a scale of
          archy/anarchy. The vertical axis can be better explained as the legitimacy of using the power of the state in order to achieve desirable
          social, economic or foreign policy outcomes. The traditions in the top of the chart are opposed to the use of power by the government and
          the bottom favor towards the use of power by the government. The horizontal axis can be explained through the legitimacy of rank, more
          specifically the preference to live in a stratified society where people are taught to respect and obey their superiors, or an egalitarian
          society in which people are taught to treat everyone as equals. The left side of the chart rejects rank, while the right accepts rank.
        </h4>
        <div className="box">
          <div className="turquiseBox">
            <h3 className="smallTitle">Republic Constitutionalism:</h3>
            <h4>
              Republic Constitutionalism is placed in the upper right and characterized by pro-archy and anti-kratos. It is a tradition which opposes
              the use of power by the government and favors hierarchy in society.
            </h4>
            <h4>
              It is a political philosophy that emphasizes the importance of limited government and individual liberty. The central idea is that the
              government should be limited in its scope and power, and that the primary role of the government is to protect the rights and freedoms
              of individuals. The philosophy is rooted in the belief that individuals are best able to govern their own lives and make their own
              decisions, and that the government should not interfere in these affairs unless it is absolutely necessary. Republican constitutionalism
              also generally advocates for a hierarchical social structure based on traditional values and norms with a strong emphasis on family,
              community, and civic duty. This can include the support for traditional gender roles, religious values, and conservative social
              policies.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Libertarian Individualism:</h3>
            <h4>
              Libertarian Individualism is placed in the upper left and characterized by anti-archy and anti-kratos. It is a tradition which opposes
              the use of power by the government and opposes hierarchy in society.{" "}
            </h4>
            <h4>
              It is political philosophy that emphasizes the importance of individual liberty and minimal government intervention in people’s lives.
              It is rooted in the belief that individuals should have the right to make their own choices and divisions, and that the government
              should not interfere in these affairs unless absolutely necessary. In the economic sphere, libertarian individualism advocates for
              minimal government regulation and taxation. In the social sphere, libertarian individualism generally does not advocate for social
              hierarchy. Rather, it emphasizes the importance of individual liberty and autonomy, and generally opposes government intervention in
              personal and private matters.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Democratic Progressivism:</h3>
            <h4>
              Democratic Progressivism is placed in the bottom left and characterized by anti-archy and pro-kratos. It is a tradition which favors the
              use of power by the government and opposes hierarchy in society.
            </h4>
            <h4>
              It is a political ideology that emphasizes the importance of democracy and progressive social and economic policies. The central idea of
              democratic progressivism is that the government should play an active role in addressing social and economic issues such as poverty,
              inequality, and discrimination. In regards to social hierarchy, a fair and equal society is advocated for since democratic progressivism
              emphasizes the importance of equality of opportunity.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Plutocratic Nationalism:</h3>
            <h4>
              Plutocratic Nationalism is placed in the bottom right and characterized by pro-archy and pro-kratos. It is a tradition which opposes the
              use of power by the government and opposes hierarchy in society.
            </h4>
            <h4>
              It is a political ideology that believes the interests of the wealthy and the interests of the nation are closely aligned. Consequently,
              that means that policies that benefit the wealthy will also benefit the nation as a whole. Overall, the wealthy hold a significant power
              and people believe in the importance of the United States and its culture.
            </h4>
          </div>
        </div>
        <h4 className="yellowBox">
          These four main traditions can be divided into more detailed eight distinct political perspectives represented in contemporary American
          politics. A potential ninth political perspective is populism, which is vaguely defined and situation dependent. There is no fixed character
          of this group other than opposition to the prevailing power.
        </h4>
        <div className="box">
          <div className="turquiseBox">
            <h3 className="smallTitle">Communitarian:</h3>
            <h4>
              Communitarianism is characterized by being ambivalent towards archy and prokratos, which means it is ambivalent about rank and supports
              an activist government.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Progressive:</h3>
            <h4>
              Progressivismis characterized by being anti archy and prokratos, which means it is egalitarian and supports an activist government.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Radical:</h3>
            <h4>
              Radicalism is characterized by being anti-archy and ambivalent towards kratos, which means it is egalitarian and is ambivalent about the
              role of government.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Individualist:</h3>
            <h4>
              Individualism is characterized by being anti-archy and anti kratos, which means it is egalitarian and supports a limited government.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Paleolibertarian:</h3>
            <h4>
              Paleolibertarianism is characterized by being ambivalent towards archy and anti-kratos, which means it is ambivalent about rank and
              supports a limited government.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Paleoconservative:</h3>
            <h4>
              Paleolibertarianism is characterized by being pro-archy and anti-kratos, which means it is hierarchical about rank and supports a
              limited government.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Theoconservative:</h3>
            <h4>
              Theoconsevatism is characterized by being pro-archy and ambivalent towards kratos, which means it is hierarchical about rank and
              ambivalent about the role of government.
            </h4>
          </div>
          <div className="turquiseBox">
            <h3 className="smallTitle">Neoconservative:</h3>
            <h4>
              Neoconservatism is characterized by being pro-archy and pro-kratos, which means it is hierarchical about rank and supports an activist
              government.
            </h4>
          </div>
        </div>
      </div>
      <h2 className="titleBox">News Sources</h2>
      <h4 className="yellowBox paragraph"> The news sources we have used are below.</h4>
    </div>
  );
};

export default LearnMore;
