<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .user-profile {
    @media (max-width: 1024px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .user-section {
      display: flex;
      align-items: center;
      @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
      }
      img {
        display: block;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
        @media (max-width: 768px) {
          width: 5rem;
          height: 5rem;
        }
      }
    }

    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1rem;
      .name {
        font-size: 1.5rem;
        line-height: 1.5;
        font-weight: bold;
        color: $gray9;
        a {
          color: inherit;
          text-decoration: none;
          &:hover {
            color: $gray8;
            text-decoration: underline;
          }
        }
      }

      .description {
        white-space: pre-wrap;
        font-size: 1.125rem;
        line-height: 1.5;
        margin-top: 0.25rem;
        color: $gray7;
        letter-spacing: -0.004em;
      }
      @media (max-width: 768px) {
        margin-left: 0;
        margin-top: 1rem;
        .name {
          font-size: 1.125rem;
        }
        .description {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          letter-spacing: -0.004em;
        }
      }
    }
  }

  .separator {
    background: $gray2;
    width: 100%;
    height: 1px;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    @media (max-width: 768px) {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }

  .profile-icons {
    display: flex;
    color: $gray5;

    .icon {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      &:hover {
        color: $gray8;
      }
      // @media (max-width: 768px) {
      //   width: 1.5rem;
      //   height: 1.5rem;
      // }
    }

    a {
      color: inherit;
      display: block;
    }
    a + a,
    a + .icon {
      margin-left: 1rem;
    }

    .email {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      div {
        background: $gray7;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
        padding: 0.5rem;
        font-size: 0.875rem;
        color: white;
        border-radius: 4px;
        @media (max-width: 768px) {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }
      }
    }
  }
</style>

<script lang="ts">
  import GithubIcon from '../../../static/svg/icon-github.svg';
  import TwitterIcon from '../../../static/svg/icon-twitter.svg';
  import FacebookSquareIcon from '../../../static/svg/icon-facebook-square.svg';
  import EmailIcon from '../../../static/svg/icon-email.svg';
  import MdHome from 'svelte-icons/md/MdHome.svelte';
  import { defaultThumbnail } from '../../config/contants';

  export let username = '';
  export let thumbnail = '';
  export let displayName = '';
  export let description = '';
  export let email = '';
  export let facebook = '';
  export let github = '';
  export let twitter = '';
  export let url = '';
  export let className = '';

  const velogyUrl = `/${username}`;

  let hoverEmail = false;
  let emailBlockRef = null;
  let userProfileRef = null;

  const onMouseEnterEmail = () => {
    hoverEmail = true;
  };

  const onMouseLeaveEmail = (e) => {
    if (e.relatedTarget === emailBlockRef) return;
    hoverEmail = false;
  };

  const includeProtocol = (address) => {
    return /^https?:\/\//.test(address) ? address : `https://${address}`;
  };

  $: {
    if (userProfileRef && className) {
      userProfileRef.classList.add(className);
    }
  }
</script>

<div class="user-profile" bind:this="{userProfileRef}">
  <div class="user-section">
    <a href="{velogyUrl}"> <img src="{thumbnail || defaultThumbnail}" alt="profile" /> </a>
    <div class="user-info">
      <div class="name"><a href="{velogyUrl}">{displayName}</a></div>
      <div class="description">{description}</div>
    </div>
  </div>
  <div class="separator"></div>

  <div class="profile-icons">
    {#if github}
      <a href="{`https://github.com/${github}`}" target="_blank" rel="noopener noreferrer">
        <div class="icon">
          <GithubIcon width="32" height="32" />
        </div>
      </a>
    {/if}

    {#if twitter}
      <a href="{`https://twitter.com/${twitter}`}" target="_blank" rel="noopener noreferrer">
        <div class="icon">
          <TwitterIcon />
        </div>
      </a>
    {/if}

    {#if facebook}
      <a href="{`https://facebook.com/${facebook}`}" target="_blank" rel="noopener noreferrer">
        <div class="icon">
          <FacebookSquareIcon />
        </div>
      </a>
    {/if}

    {#if url}
      <a href="{includeProtocol(url)}" target="_blank" rel="noopener noreferrer">
        <div class="icon">
          <MdHome />
        </div>
      </a>
    {/if}

    {#if email}
      <a href="{`mailto:${email}`}">
        <div class="icon" on:mouseover="{onMouseEnterEmail}" on:mouseout="{onMouseLeaveEmail}">
          <EmailIcon />
        </div>
      </a>
    {/if}

    {#if hoverEmail}
      <div class="email" bind:this="{emailBlockRef}" on:mouseout="{onMouseLeaveEmail}">
        <div>{email}</div>
      </div>
    {/if}
  </div>
</div>
