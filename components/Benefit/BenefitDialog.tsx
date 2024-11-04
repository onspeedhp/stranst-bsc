import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '../ui/dialog';
import {
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import React from 'react';
import { DialogHeader } from '../ui/dialog';
import clsx from 'clsx';

const benefitList = [
  {
    type: 'Short-term Benefits',
    items: [
      {
        title: 'Priority Access to $SANT Private Sale',
        content:
          'Only those who hold a STRANT VIP Pass can participate in the purchase of STRANT AI Tokens, the most valuable tokens in this ecosystem.',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 23.3334C18.8562 23.3334 23.3333 18.8562 23.3333 13.3334C23.3333 7.81053 18.8562 3.33337 13.3333 3.33337C7.81047 3.33337 3.33331 7.81053 3.33331 13.3334C3.33331 18.8562 7.81047 23.3334 13.3333 23.3334Z"
              fill="url(#paint0_linear_2085_1584)"
            />
            <path
              d="M30.15 17.2833C31.7255 17.8707 33.1275 18.8459 34.2263 20.1187C35.325 21.3914 36.0851 22.9207 36.4362 24.5651C36.7874 26.2095 36.7182 27.9159 36.2351 29.5264C35.752 31.137 34.8706 32.5997 33.6724 33.7793C32.4742 34.959 30.9979 35.8175 29.38 36.2754C27.7621 36.7333 26.0548 36.7758 24.4161 36.3991C22.7774 36.0223 21.2602 35.2385 20.0047 34.12C18.7492 33.0015 17.7961 31.5845 17.2333 30"
              stroke="url(#paint1_linear_2085_1584)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.6667 10H13.3334V16.6667"
              stroke="url(#paint2_linear_2085_1584)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M27.85 23.1333L29.0167 24.3166L24.3167 29.0166"
              stroke="url(#paint3_linear_2085_1584)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1584"
                x1="23.4972"
                y1="22.8116"
                x2="-2.46872"
                y2="13.1028"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1584"
                x1="36.8159"
                y1="36.148"
                x2="11.6156"
                y2="26.6995"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1584"
                x1="13.347"
                y1="16.4928"
                x2="10.902"
                y2="16.2642"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2085_1584"
                x1="29.0552"
                y1="28.8632"
                x2="22.6698"
                y2="26.9558"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        title: 'Dedicated Support Team',
        content:
          'With a STRANT VIP Pass, you will receive support from STRANT’s professional sales team, ensuring all your transactions’ safety and time efficiency, maximize your value',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 30V20C5 16.0218 6.58035 12.2064 9.3934 9.3934C12.2064 6.58035 16.0218 5 20 5C23.9782 5 27.7936 6.58035 30.6066 9.3934C33.4196 12.2064 35 16.0218 35 20V30"
              stroke="url(#paint0_linear_2085_1589)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M35 31.6667C35 32.5508 34.6488 33.3986 34.0237 34.0237C33.3986 34.6489 32.5507 35 31.6667 35H30C29.1159 35 28.2681 34.6489 27.643 34.0237C27.0179 33.3986 26.6667 32.5508 26.6667 31.6667V26.6667C26.6667 25.7827 27.0179 24.9348 27.643 24.3097C28.2681 23.6846 29.1159 23.3334 30 23.3334H35V31.6667ZM5 31.6667C5 32.5508 5.35119 33.3986 5.97631 34.0237C6.60143 34.6489 7.44928 35 8.33333 35H10C10.8841 35 11.7319 34.6489 12.357 34.0237C12.9821 33.3986 13.3333 32.5508 13.3333 31.6667V26.6667C13.3333 25.7827 12.9821 24.9348 12.357 24.3097C11.7319 23.6846 10.8841 23.3334 10 23.3334H5V31.6667Z"
              fill="url(#paint1_linear_2085_1589)"
              stroke="url(#paint2_linear_2085_1589)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1589"
                x1="35.2459"
                y1="29.3478"
                x2="-1.70862"
                y2="12.7668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1589"
                x1="35.2459"
                y1="34.6957"
                x2="12.1772"
                y2="12.5157"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1589"
                x1="35.2459"
                y1="34.6957"
                x2="12.1772"
                y2="12.5157"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        title: 'Receive benefits from product revenue.',
        content:
          'Receive a 10% share of STRANT AI assistant products revenue (divided equally among 100,000 NFTs).',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.6667 8.33337L8.33334 31.6667"
              stroke="url(#paint0_linear_2085_1594)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.8333 15C13.1345 15 15 13.1345 15 10.8333C15 8.53211 13.1345 6.66663 10.8333 6.66663C8.53214 6.66663 6.66666 8.53211 6.66666 10.8333C6.66666 13.1345 8.53214 15 10.8333 15Z"
              fill="url(#paint1_linear_2085_1594)"
              stroke="url(#paint2_linear_2085_1594)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.1667 33.3333C31.4679 33.3333 33.3333 31.4679 33.3333 29.1667C33.3333 26.8655 31.4679 25 29.1667 25C26.8655 25 25 26.8655 25 29.1667C25 31.4679 26.8655 33.3333 29.1667 33.3333Z"
              stroke="url(#paint3_linear_2085_1594)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1594"
                x1="31.8579"
                y1="31.058"
                x2="1.5643"
                y2="19.731"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1594"
                x1="15.0683"
                y1="14.7826"
                x2="4.24915"
                y2="10.7372"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1594"
                x1="15.0683"
                y1="14.7826"
                x2="4.24915"
                y2="10.7372"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2085_1594"
                x1="33.4016"
                y1="33.1159"
                x2="22.5825"
                y2="29.0706"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
    ],
  },
  {
    type: 'Long-term Benefits',
    items: [
      {
        title: 'Passive Income from Transaction Fees',
        content:
          'Simply holding the STRANT VIP Pass entitles you to 20% of the transaction fees from every $STRANT AI Token swap.',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66669 10V30C6.66669 31.8333 8.16669 33.3333 10 33.3333H33.3334V13.913"
              fill="url(#paint0_linear_2085_1603)"
            />
            <path
              d="M33.3334 20V13.3333H10C9.11597 13.3333 8.26812 12.9821 7.643 12.357C7.01788 11.7319 6.66669 10.884 6.66669 9.99996C6.66669 8.16663 8.16669 6.66663 10 6.66663H30V13.3333"
              fill="url(#paint1_linear_2085_1603)"
            />
            <path
              d="M33.3334 20V13.3333H10C9.11597 13.3333 8.26812 12.9821 7.643 12.357C7.01788 11.7319 6.66669 10.884 6.66669 9.99996C6.66669 8.16663 8.16669 6.66663 10 6.66663H30V13.3333"
              stroke="url(#paint2_linear_2085_1603)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M30 20C29.116 20 28.2681 20.3512 27.643 20.9763C27.0179 21.6014 26.6667 22.4493 26.6667 23.3333C26.6667 25.1667 28.1667 26.6667 30 26.6667H36.6667V20H30Z"
              fill="url(#paint3_linear_2085_1603)"
              stroke="url(#paint4_linear_2085_1603)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1603"
                x1="33.5519"
                y1="32.7246"
                x2="0.183576"
                y2="18.4656"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1603"
                x1="33.5519"
                y1="19.6521"
                x2="8.2435"
                y2="0.726129"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1603"
                x1="33.5519"
                y1="19.6521"
                x2="8.2435"
                y2="0.726129"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2085_1603"
                x1="36.7487"
                y1="26.4928"
                x2="25.4916"
                y2="20.1791"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint4_linear_2085_1603"
                x1="36.7487"
                y1="26.4928"
                x2="25.4916"
                y2="20.1791"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        title: 'Full Access to the STRANT Ecosystem',
        content:
          'Turn your NFT into Tokens and unlock all the advanced trading features that STRANT has to offer.',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6667 33.3334H28.3333"
              stroke="url(#paint0_linear_2085_1610)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.6667 33.3333C25.8333 29.1666 18 22.6666 21.6667 16.6666"
              stroke="url(#paint1_linear_2085_1610)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.8333 15.6666C17.6667 17 18.8333 19.3333 19.6667 21.8333C16.3333 22.5 13.8333 22.5 11.6667 21.3333C9.66666 20.3333 7.83332 18.1666 6.66666 14.3333C11.3333 13.5 14 14.3333 15.8333 15.6666Z"
              fill="url(#paint2_linear_2085_1610)"
              stroke="url(#paint3_linear_2085_1610)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M23.5 9.99996C22.2293 11.9859 21.5901 14.3102 21.6667 16.6666C24.8333 16.5 27.1667 15.6666 28.8333 14.3333C30.5 12.6666 31.5 10.5 31.6667 6.66663C27.1667 6.83329 25 8.33329 23.5 9.99996Z"
              fill="url(#paint4_linear_2085_1610)"
              stroke="url(#paint5_linear_2085_1610)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1610"
                x1="28.4699"
                y1="34.3073"
                x2="27.8508"
                y2="30.4489"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1610"
                x1="21.7076"
                y1="32.8985"
                x2="14.4005"
                y2="32.0789"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1610"
                x1="19.7732"
                y1="22.0676"
                x2="5.46267"
                y2="13.6707"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2085_1610"
                x1="19.7732"
                y1="22.0676"
                x2="5.46267"
                y2="13.6707"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint4_linear_2085_1610"
                x1="31.7487"
                y1="16.4058"
                x2="18.7597"
                y2="11.5461"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint5_linear_2085_1610"
                x1="31.7487"
                y1="16.4058"
                x2="18.7597"
                y2="11.5461"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        title: 'Receive Airdrops from Partner Projects',
        content:
          'Each STRANT VIP Pass is your ticket to receiving Airdrops from STRANT’s strategic partners – free tokens will land in your hands!',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.35 26.4833C34.2897 28.9908 32.6313 31.2004 30.5198 32.9188C28.4083 34.6373 25.9079 35.8124 23.2374 36.3413C20.5668 36.8702 17.8074 36.7369 15.2002 35.953C12.5931 35.1691 10.2177 33.7585 8.2817 31.8444C6.34569 29.9304 4.90802 27.5713 4.09439 24.9733C3.28076 22.3753 3.11593 19.6175 3.61433 16.9411C4.11272 14.2646 5.25916 11.7511 6.95341 9.62006C8.64766 7.48906 10.8381 5.80554 13.3333 4.71667"
              stroke="url(#paint0_linear_2085_1614)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M36.6667 20C36.6667 17.8113 36.2356 15.6441 35.398 13.622C34.5604 11.5999 33.3328 9.76257 31.7851 8.21493C30.2375 6.66728 28.4002 5.43963 26.3781 4.60205C24.356 3.76447 22.1887 3.33337 20 3.33337V20H36.6667Z"
              fill="url(#paint1_linear_2085_1614)"
              stroke="url(#paint2_linear_2085_1614)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1614"
                x1="35.6124"
                y1="35.8256"
                x2="-5.93162"
                y2="20.2555"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1614"
                x1="36.8033"
                y1="19.5653"
                x2="15.165"
                y2="11.4745"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1614"
                x1="36.8033"
                y1="19.5653"
                x2="15.165"
                y2="11.4745"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        title: 'Experience Cutting-Edge AI Features for Free',
        content:
          'What’s better than being able to use STRANT’s entire advanced AI-powered training and trading system for free?',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99998 5H30L36.6666 15L20 36.6667L3.33331 15L9.99998 5Z"
              fill="url(#paint0_linear_2085_1619)"
            />
            <path
              d="M20 36.6667L26.6667 15L21.6667 5"
              stroke="url(#paint1_linear_2085_1619)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 36.6667L13.3333 15L18.3333 5"
              stroke="url(#paint2_linear_2085_1619)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.33331 15H36.6666"
              stroke="url(#paint3_linear_2085_1619)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1619"
                x1="36.9399"
                y1="35.8406"
                x2="-5.77077"
                y2="19.0303"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1619"
                x1="26.7213"
                y1="35.8406"
                x2="16.9167"
                y2="35.0688"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1619"
                x1="20.0546"
                y1="35.8406"
                x2="10.25"
                y2="35.0688"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2085_1619"
                x1="36.9399"
                y1="15.9739"
                x2="36.6244"
                y2="12.0415"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        title: 'Participate in Exclusive Testing Programs and Voting Rights',
        content:
          'You’ll be the first to try out all the new features and testing programs. You also get voting rights to help shape product development and push STRANT to even greater heights.',
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6667 35V31.6667C26.6667 29.8986 25.9643 28.2029 24.7141 26.9526C23.4638 25.7024 21.7681 25 20 25H10C8.2319 25 6.53621 25.7024 5.28597 26.9526C4.03572 28.2029 3.33334 29.8986 3.33334 31.6667V35"
              fill="url(#paint0_linear_2085_1623)"
            />
            <path
              d="M15 18.3333C18.6819 18.3333 21.6667 15.3486 21.6667 11.6667C21.6667 7.98477 18.6819 5 15 5C11.3181 5 8.33334 7.98477 8.33334 11.6667C8.33334 15.3486 11.3181 18.3333 15 18.3333Z"
              fill="url(#paint1_linear_2085_1623)"
              stroke="url(#paint2_linear_2085_1623)"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M36.6667 35V31.6667C36.6656 30.1896 36.1739 28.7546 35.2689 27.5872C34.3639 26.4198 33.0969 25.586 31.6667 25.2167"
              stroke="url(#paint3_linear_2085_1623)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M26.6667 5.21667C28.1007 5.58384 29.3717 6.41784 30.2794 7.58719C31.1871 8.75654 31.6797 10.1947 31.6797 11.675C31.6797 13.1553 31.1871 14.5935 30.2794 15.7628C29.3717 16.9322 28.1007 17.7662 26.6667 18.1333"
              stroke="url(#paint4_linear_2085_1623)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2085_1623"
                x1="26.8579"
                y1="34.7391"
                x2="7.25228"
                y2="17.6342"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_2085_1623"
                x1="21.776"
                y1="17.9855"
                x2="4.46532"
                y2="11.5129"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint2_linear_2085_1623"
                x1="21.776"
                y1="17.9855"
                x2="4.46532"
                y2="11.5129"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint3_linear_2085_1623"
                x1="36.7076"
                y1="34.7448"
                x2="29.5693"
                y2="33.3807"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
              <linearGradient
                id="paint4_linear_2085_1623"
                x1="31.7208"
                y1="17.7964"
                x2="24.4554"
                y2="16.7421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#8237EA" />
                <stop
                  offset="1"
                  stop-color="#098BA8"
                />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
    ],
  },
];
export default function BenefitDialog() {
  return (
    <Dialog>
      <DialogTrigger aria-hidden={false}>
        <div className="flex justify-center lg:justify-start m-0 items-center py-2 gap-2.5 cursor-pointer hover:opacity-80 lg:mt-4">
          <p className="hidden lg:block text-sm font-semibold text-slate-400">
            See Benefit details
          </p>
          <ArrowRight
            size={16}
            color="#94A3B8"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#101111] border-none py-12 lg:py-6 max-w-[982px] max-h-screen overflow-y-auto rounded-none lg:rounded-xl">
        <DialogHeader className="relative">
          <DialogClose className="outline-none lg:hidden">
            <ArrowLeft className="absolute left-0 top-1/2 -translate-y-[8px]" />
          </DialogClose>
          <DialogTitle className="text-lg tracking-[-0.5%] text-white font-bold">
            VIP Pass holder benefits
          </DialogTitle>
          <p className="text-sm text-slate-300 hidden lg:block">
            STRANT issues 100,000 NFTs with special privileges for pioneers
            contributing to the platform.
          </p>
        </DialogHeader>
        {benefitList.map((item, idx) => (
          <div
            key={idx}
            className={clsx({ 'mb-6': idx + 1 !== benefitList.length })}
          >
            <p className="mb-3 font-semibold text-[#3ECFFF]">{item.type}</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {item.items.map((child) => (
                <div key={child.title}>
                  {child.icon}
                  <p className="my-2 text-white text-sm font-semibold">
                    {child.title}
                  </p>
                  <p className="text-sm text-slate-300">{child.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
