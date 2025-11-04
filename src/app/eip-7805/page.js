'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExternalLink,
  faInfoCircle,
  faCheckCircle,
  faQuestionCircle,
} from '@awesome.me/kit-ebf6e3e7b8/icons/sharp/solid'

const EIP7805Page = () => {
  return (
    <div className={'container pb-10'}>
      {/* Hero Section */}
      <div className={'mb-8'}>
        <div className={'flex items-center gap-2 mb-4'}>
          <Badge variant={'secondary'}>EIP-7805</Badge>
          <Badge variant={'outline'}>FOCIL</Badge>
          <Badge variant={'outline'}>Glamsterdam</Badge>
        </div>
        <h1 className={'text-4xl md:text-5xl font-bold mb-4'}>
          Stakers Union Backs EIP-7805 (FOCIL) for Glamsterdam
        </h1>
        <p className={'text-lg text-muted-foreground max-w-3xl'}>
          Stakers Union has formally voted to support EIP-7805: Fork-choice enforced Inclusion Lists
          (FOCIL) for inclusion in the next Ethereum network upgrade, Glamsterdam. We believe FOCIL
          measurably improves censorship resistance, reduces builder centralization risk, and
          strengthens solo-validator sovereignty without adding undue operational burden to home
          stakers.
        </p>
      </div>

      <Separator className={'my-8'} />

      {/* What is EIP-7805 */}
      <Card className={'mb-8'}>
        <CardHeader>
          <CardTitle>What EIP-7805 Proposes (in plain terms)</CardTitle>
          <CardDescription>
            Understanding the mechanics of Fork-choice enforced Inclusion Lists
          </CardDescription>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <p className={'text-base'}>
            EIP-7805 introduces "inclusion lists" produced by a small, rotating committee of
            validators every slot. These lists contain transactions seen in the public mempool that
            must be included by block builders / proposers for the block to be considered valid,
            enforced at the fork-choice level. In practice, this means if a builder tries to censor
            valid transactions, the protocol gives honest validators a way to enforce inclusion so
            those transactions land on-chain in a timely manner.
          </p>

          <div className={'grid md:grid-cols-3 gap-4 mt-6'}>
            <Card>
              <CardHeader>
                <CardTitle className={'text-lg'}>Rotating IL Committee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={'text-sm text-muted-foreground'}>
                  A subset of validators is randomly selected each slot to publish inclusion lists
                  based on their mempool view. Proposers and attesters observe, store, and help
                  propagate these lists.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={'text-lg'}>Fork-choice Enforcement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={'text-sm text-muted-foreground'}>
                  If a payload omits transactions that could have fit (and were on the inclusion
                  list), the fork-choice rule can favor the chain where they are included—providing
                  teeth against censorship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className={'text-lg'}>Design Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={'text-sm text-muted-foreground'}>
                  Address bribery/extortion edge cases, reduce equivocation risks around ILs, and
                  remain compatible with account abstraction and transaction invalidation realities.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Why This Matters */}
      <Card className={'mb-8'}>
        <CardHeader>
          <CardTitle>Why This Matters Now</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={'text-base mb-4'}>
            Block production has consolidated among a few sophisticated builders. Community analyses
            and developer threads have highlighted that concentration as a live
            censorship-resistance risk. FOCIL counterbalances builder power by empowering the
            validator set—<em>including solo validators</em>—to guarantee transaction inclusion at
            the protocol level.
          </p>
          <Link
            href={
              'https://ethereum-magicians.org/t/eip-7805-fork-choice-inclusion-lists-focil-as-a-candidate-for-glamsterdam/24342'
            }
            target={'_blank'}
          >
            <Button
              variant={'outline'}
              size={'sm'}
              className={'inline-flex items-center'}
            >
              Fellowship of Ethereum Magicians Discussion
              <FontAwesomeIcon
                icon={faExternalLink}
                className={'ml-2 text-xs'}
              />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Relationship to Glamsterdam */}
      <Card className={'mb-8'}>
        <CardHeader>
          <CardTitle>Relationship to Glamsterdam</CardTitle>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <p className={'text-base'}>
            Glamsterdam (Meta-EIP-7773) is the next major upgrade after Fusaka. Scheduled Ethereum
            network upgrades consist of a collection of EIPs, decided upon by the community through
            social consensus. FOCIL (EIP-7805) has been discussed as a Glamsterdam candidate and is
            now being considered for inclusion.
          </p>
          <Alert>
            <FontAwesomeIcon icon={faInfoCircle} />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              Meta-EIP-7773 tracks scope and activation details for Glamsterdam across testnets and
              mainnet; specific contents and timelines are confirmed via AllCoreDevs processes.
            </AlertDescription>
          </Alert>
          <div className={'flex gap-2 flex-wrap'}>
            <Link
              href={'https://eips.ethereum.org/EIPS/eip-7773'}
              target={'_blank'}
            >
              <Button
                variant={'outline'}
                size={'sm'}
              >
                Meta-EIP-7773 (Glamsterdam)
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className={'ml-2 text-xs'}
                />
              </Button>
            </Link>
            <Link
              href={'https://eips.ethereum.org/EIPS/eip-7805'}
              target={'_blank'}
            >
              <Button
                variant={'outline'}
                size={'sm'}
              >
                EIP-7805 Specification
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className={'ml-2 text-xs'}
                />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stakers Union Perspective */}
      <div className={'mb-8'}>
        <h2 className={'text-3xl font-bold mb-6'}>The Stakers Union Perspective</h2>
        <div className={'grid md:grid-cols-3 gap-6'}>
          <Card>
            <CardHeader>
              <CardTitle className={'text-xl'}>1. Solo-staker Sovereignty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={'text-sm text-muted-foreground'}>
                Home validators are the backbone of credible neutrality. FOCIL restores meaningful
                leverage to validators (not just builders) in the inclusion pipeline. That aligns
                with our mission to keep Ethereum open to small operators and resilient to policy or
                profit-driven filtering.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={'text-xl'}>2. Protocol-level Guarantees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={'text-sm text-muted-foreground'}>
                Rather than relying on voluntary norms, FOCIL makes inclusion enforceable in
                fork-choice. This reduces the burden on end-users to "self-defend" against
                censorship, and reduces reliance on centralized relays or builder altruism.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={'text-xl'}>3. Glamsterdam Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={'text-sm text-muted-foreground'}>
                Glamsterdam discussions include enshrined proposer-builder separation (ePBS) and
                related resilience work. FOCIL complements this overarching theme by giving
                validators a censorship-resilient backstop even as block production architecture
                evolves.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className={'my-8'} />

      {/* What Changes for Solo Stakers */}
      <Card className={'mb-8'}>
        <CardHeader>
          <CardTitle>What Changes for Solo Stakers?</CardTitle>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <div className={'space-y-4'}>
            <div>
              <h3 className={'font-semibold mb-2 flex items-center gap-2'}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={'text-primary'}
                />
                Client Updates
              </h3>
              <p className={'text-sm text-muted-foreground ml-6'}>
                As with any fork, expect execution/consensus client upgrades. We will share links to
                support resources/communities once client teams finalize releases. (Meta-EIP-7773
                remains the canonical scope reference.)
              </p>
            </div>

            <div>
              <h3 className={'font-semibold mb-2 flex items-center gap-2'}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={'text-primary'}
                />
                Operational Flow
              </h3>
              <p className={'text-sm text-muted-foreground ml-6'}>
                No special hardware changes are anticipated for home validators from FOCIL itself.
                Inclusion list participation/verification logic is handled in client software as
                part of the protocol.
              </p>
            </div>

            <div>
              <h3 className={'font-semibold mb-2 flex items-center gap-2'}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={'text-primary'}
                />
                Network Effects
              </h3>
              <p className={'text-sm text-muted-foreground ml-6'}>
                By distributing inclusion power across many validators, the marginal impact of any
                single censoring builder shrinks. That improves transaction liveness for all users,
                including your own transactions/withdrawals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Questions */}
      <div className={'mb-8'}>
        <h2 className={'text-3xl font-bold mb-6'}>Addressing Common Questions</h2>
        <Accordion type={'single'} collapsible className={'w-full'}>
          <AccordionItem value={'mev-block-quality'}>
            <AccordionTrigger className={'text-left'}>
              <span className={'flex items-center gap-2'}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className={'text-primary'}
                />
                Does FOCIL hurt MEV or block quality?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className={'text-sm text-muted-foreground'}>
                FOCIL constrains builders only to the extent of including valid transactions listed
                by the committee that fit in the block. It does not require builders to abandon
                optimization, it just prevents exclusion of valid transactions.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value={'equivocation-extortion'}>
            <AccordionTrigger className={'text-left'}>
              <span className={'flex items-center gap-2'}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className={'text-primary'}
                />
                What about equivocation or extortion scenarios?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className={'text-sm text-muted-foreground'}>
                EIP-7805 explicitly considers equivocation and bribery/exploitation vectors in its
                rationale and mechanism design, and proposes strategies to mitigate them while
                keeping the system robust.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value={'glamsterdam-inclusion'}>
            <AccordionTrigger className={'text-left'}>
              <span className={'flex items-center gap-2'}>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className={'text-primary'}
                />
                Is EIP-7805 definitely in Glamsterdam?
              </span>
            </AccordionTrigger>
            <AccordionContent className={'space-y-4'}>
              <p className={'text-sm text-muted-foreground'}>
                FOCIL has been actively discussed for inclusion in the upcoming Glamsterdam upgrade
                and is currently classified as <em>Considered for Inclusion (CFI)</em>. Final
                inclusion will depend on upcoming All Core Devs decisions and client-team readiness.
                The Stakers Union supports its inclusion and will continue to track progress
                closely.
              </p>
              <p className={'text-sm text-muted-foreground'}>
                To help ensure that solo-staker priorities like FOCIL remain visible, you can make
                your voice heard—share this article, discuss the proposal on social media, and
                participate in the broader Ethereum governance dialogue that shapes protocol
                evolution.
              </p>
              <div className={'mt-4'}>
                <Link
                  href={'https://ethereum.org/governance'}
                  target={'_blank'}
                >
                  <Button
                    variant={'outline'}
                    size={'sm'}
                    className={'inline-flex items-center'}
                  >
                    Learn more about Ethereum governance
                    <FontAwesomeIcon
                      icon={faExternalLink}
                      className={'ml-2 text-xs'}
                    />
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator className={'my-8'} />

      {/* Our Commitment */}
      <Card className={'mb-8'}>
        <CardHeader>
          <CardTitle>Our Commitment</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className={'space-y-3 list-disc list-inside text-sm text-muted-foreground'}>
            <li>Advocate for censorship-resistant, validator-empowering protocol changes.</li>
            <li>
              Provide plain-English upgrade guidance for solo stakers when client releases are
              tagged.
            </li>
            <li>
              Continue to participate in governance and public education on inclusion, neutrality,
              and decentralization.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardHeader>
          <CardTitle>References & Further Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={'flex flex-col gap-3'}>
            <Link
              href={'https://eips.ethereum.org/EIPS/eip-7805'}
              target={'_blank'}
            >
              <Button
                variant={'outline'}
                size={'sm'}
                className={'inline-flex items-center'}
              >
                EIP-7805 spec: committee mechanics, fork-choice enforcement, design goals
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className={'ml-2 text-xs'}
                />
              </Button>
            </Link>
            <Link
              href={
                'https://ethereum-magicians.org/t/eip-7805-fork-choice-inclusion-lists-focil-as-a-candidate-for-glamsterdam/24342'
              }
              target={'_blank'}
            >
              <Button
                variant={'outline'}
                size={'sm'}
                className={'inline-flex items-center'}
              >
                Magicians discussion threads on FOCIL and Glamsterdam scoping
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className={'ml-2 text-xs'}
                />
              </Button>
            </Link>
            <Link
              href={'https://eips.ethereum.org/EIPS/eip-7773'}
              target={'_blank'}
            >
              <Button
                variant={'outline'}
                size={'sm'}
                className={'inline-flex items-center'}
              >
                Glamsterdam Meta-EIP (EIP-7773)
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className={'ml-2 text-xs'}
                />
              </Button>
            </Link>
            <Link
              href={'https://www.youtube.com/watch?v=cUGyLx-mf6I'}
              target={'_blank'}
            >
              <Button
                variant={'outline'}
                size={'sm'}
                className={'inline-flex items-center'}
              >
                Video explainer (PEEPanEIP #141) with EIP authors
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className={'ml-2 text-xs'}
                />
              </Button>
            </Link>
            <Link
              href={
                'https://etherworld.co/2025/08/10/focil-eip-7805-cfid-with-strong-developer-community-backing/'
              }
              target={'_blank'}
            >
              <Button
                variant={'outline'}
                size={'sm'}
                className={'inline-flex items-center'}
              >
                Community primers and coverage of FOCIL/CFI
                <FontAwesomeIcon
                  icon={faExternalLink}
                  className={'ml-2 text-xs'}
                />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EIP7805Page
